import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Product, ProductFormData } from '../types/admin';

export function useProductOperations() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [specificationKeys, setSpecificationKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  const handleAuthError = useCallback(() => {
    console.error('Authentication failed, removing token and redirecting to login');
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/admin/login');
  }, [navigate]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const token = localStorage.getItem('admin-token');
      
      if (!token) {
        console.error('No authentication token found');
        setError('Nav autentifikācijas atslēgas');
        handleAuthError();
        return;
      }

      // Fetch categories from the dedicated endpoint
      const response = await axios.get('/api/produkti/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setCategories(response.data.data);
        setExistingCategories(response.data.data); // Also set for form usage
        setError(null);
      } else {
        console.error('API Error:', response.data.error);
        setError(`API kļūda: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        handleAuthError();
      } else {
        setError(axios.isAxiosError(error) ? 
          `Kļūda ielādējot kategorijas: ${error.message}` : 
          'Nezināma kļūda ielādējot kategorijas'
        );
      }
    } finally {
      setLoadingCategories(false);
    }
  }, [handleAuthError]);

  const fetchSpecificationKeys = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin-token');
      
      if (!token) {
        console.error('No authentication token found');
        handleAuthError();
        return;
      }

      const response = await axios.get('/api/produkti/specification-keys', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setSpecificationKeys(response.data.data);
      } else {
        console.warn('Error fetching specification keys:', response.data.error);
        // Don't set error for specification keys as it's not critical
        setSpecificationKeys([]);
      }
    } catch (error) {
      console.warn('Error fetching specification keys:', error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        handleAuthError();
      }
      setSpecificationKeys([]);
    }
  }, [handleAuthError]);

  const fetchProducts = useCallback(async (category?: string) => {
    try {
      setLoading(true);
      console.log('Fetching products...', category ? `for category: ${category}` : 'all products');
      const token = localStorage.getItem('admin-token');
      
      if (!token) {
        console.error('No authentication token found');
        setError('Nav autentifikācijas atslēgas');
        handleAuthError();
        return;
      }

      const url = category ? `/api/produkti?category=${encodeURIComponent(category)}` : '/api/produkti';
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        setProducts(response.data.data);
        setError(null);
      } else {
        console.error('API Error:', response.data.error);
        setError(`API kļūda: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        handleAuthError();
      } else {
        setError(axios.isAxiosError(error) ? 
          `Kļūda ielādējot produktus: ${error.message}` : 
          'Nezināma kļūda ielādējot produktus'
        );
      }
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  const uploadImages = async (productId: number, files: FileList) => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      console.error('No authentication token found');
      handleAuthError();
      return;
    }

    const uploadPromises = Array.from(files).map(async (file, index) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('isMain', index === 0 ? 'true' : 'false'); // First image is main

      return axios.post(`/api/produkti/${productId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    });

    await Promise.all(uploadPromises);
  };

  const saveProduct = async (formData: ProductFormData, selectedImages: FileList | null, editingId?: number) => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      console.error('No authentication token found');
      handleAuthError();
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const submitData = {
      ...formData,
      price: formData.price && formData.price.trim() !== '' ? parseFloat(formData.price) : undefined,
      specifications: Object.keys(formData.specifications).length > 0 ? formData.specifications : undefined
    };
    
    console.log('Submitting data:', submitData);
    
    let productId: number;
    
    if (editingId) {
      await axios.put(`/api/produkti/${editingId}`, submitData, { headers });
      productId = editingId;
    } else {
      const response = await axios.post('/api/produkti', submitData, { headers });
      productId = response.data.data.id;
    }

    // Upload images if any are selected
    if (selectedImages && selectedImages.length > 0) {
      await uploadImages(productId, selectedImages);
    }

    // Refresh categories, specification keys and products
    await fetchCategories();
    await fetchSpecificationKeys();
  };

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem('admin-token');
      await axios.delete(`/api/produkti/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Don't auto-refresh here - let the component handle the refresh
    } catch (error) {
      console.error('Error deleting product:', error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        handleAuthError();
      } else {
        alert('Kļūda dzēšot produktu');
      }
    }
  };

  return {
    products,
    categories,
    specificationKeys,
    loading,
    loadingCategories,
    error,
    existingCategories,
    fetchCategories,
    fetchSpecificationKeys,
    fetchProducts,
    saveProduct,
    deleteProduct,
    setError
  };
}
