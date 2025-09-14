import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Article, ArticleFormData } from '../types/admin';

export function useArticleOperations() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = useCallback(() => {
    console.error('Authentication failed, removing token and redirecting to login');
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/admin/login');
  }, [navigate]);

  const fetchArticles = useCallback(async () => {
    try {
      console.log('Fetching articles...');
      const token = localStorage.getItem('admin-token');
      console.log('Auth token:', token ? 'Present' : 'Missing');

      if (!token) {
        console.error('No authentication token found');
        setError('Nav autentifikācijas atslēgas');
        handleAuthError();
        return;
      }

      const response = await axios.get('/api/aktualitates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        setArticles(response.data.data);
        setError(null);
      } else {
        console.error('API Error:', response.data.error);
        setError(`API kļūda: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        handleAuthError();
      } else {
        setError(
          axios.isAxiosError(error)
            ? `Kļūda ielādējot aktualitātes: ${error.message}`
            : 'Nezināma kļūda ielādējot aktualitātes'
        );
      }
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  const uploadImages = async (articleId: number, files: FileList) => {
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

      return axios.post(`/api/aktualitates/${articleId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
    });

    await Promise.all(uploadPromises);
  };

  const saveArticle = async (
    formData: ArticleFormData,
    selectedImages: FileList | null,
    editingId?: number
  ) => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      console.error('No authentication token found');
      handleAuthError();
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    console.log('Submitting article data:', formData);

    let articleId: number;

    if (editingId) {
      await axios.put(`/api/aktualitates/${editingId}`, formData, { headers });
      articleId = editingId;
    } else {
      const response = await axios.post('/api/aktualitates', formData, { headers });
      articleId = response.data.data.id;
    }

    // Upload images if any are selected
    if (selectedImages && selectedImages.length > 0) {
      await uploadImages(articleId, selectedImages);
    }

    // Refresh articles
    await fetchArticles();
  };

  const deleteArticle = async (id: number) => {
    try {
      const token = localStorage.getItem('admin-token');
      await axios.delete(`/api/aktualitates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        handleAuthError();
      } else {
        alert('Kļūda dzēšot aktualitāti');
      }
    }
  };

  return {
    articles,
    loading,
    error,
    fetchArticles,
    saveArticle,
    deleteArticle,
    setError,
  };
}
