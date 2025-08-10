import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';

interface Prece {
  id: number;
  name: string;
  description: string;
  price?: number;
  category?: string;
  image_url?: string;
  available: boolean;
  featured: boolean;
  created_at: string;
  images?: Array<{
    id: number;
    uuid: string;
    url: string;
    original_name: string;
    file_size: number;
    width: number;
    height: number;
    is_main: boolean;
  }>;
  main_image?: {
    id: number;
    uuid: string;
    url: string;
    original_name: string;
    file_size: number;
    width: number;
    height: number;
    is_main: boolean;
  } | null;
}

export function AdminPreces() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [preces, setPreces] = useState<Prece[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true,
    featured: false
  });
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImages) {
        Array.from(selectedImages).forEach(file => {
          URL.revokeObjectURL(URL.createObjectURL(file));
        });
      }
    };
  }, [selectedImages]);

  // Set admin theme when component mounts
  useEffect(() => {
    try {
      setTheme('admin');
    } catch (err) {
      console.error('Error setting theme:', err);
    }
  }, [setTheme]);

  const fetchPreces = useCallback(async () => {
    try {
      console.log('Fetching preces...');
      const token = localStorage.getItem('admin-token');
      console.log('Auth token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        console.error('No authentication token found');
        setError('Nav autentifikācijas atslēgas');
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/produkti', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('API Response:', response.data);
      
      if (response.data.success) {
        setPreces(response.data.data);
        setError(null);
        
        // Extract unique categories from existing products
        const categories = response.data.data
          .map((product: Prece) => product.category)
          .filter((category: string | undefined) => category && category.trim() !== '')
          .filter((category: string, index: number, self: string[]) => self.indexOf(category) === index)
          .sort();
        setExistingCategories(categories);
      } else {
        console.error('API Error:', response.data.error);
        setError(`API kļūda: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error fetching preces:', error);
      // If it's an auth error, redirect to login
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        console.error('Authentication failed, removing token and redirecting to login');
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        navigate('/admin/login');
      } else {
        setError(axios.isAxiosError(error) ? 
          `Kļūda ielādējot produktus: ${error.message}` : 
          'Nezināma kļūda ielādējot produktus'
        );
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchPreces();
  }, [user, navigate, fetchPreces]);

  const uploadImages = async (produktId: number, files: FileList) => {
    try {
      const token = localStorage.getItem('admin-token');
      if (!token) {
        console.error('No authentication token found');
        navigate('/admin/login');
        return;
      }

      const uploadPromises = Array.from(files).map(async (file, index) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('isMain', index === 0 ? 'true' : 'false'); // First image is main

        return axios.post(`/api/produkti/${produktId}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      });

      await Promise.all(uploadPromises);
      // Don't fetch here - let the calling function handle the refresh
    } catch (error) {
      console.error('Error uploading images:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-user');
          navigate('/admin/login');
          alert('Autentifikācijas kļūda. Lūdzu ielogojieties atkārtoti.');
        } else {
          alert(`Kļūda augšupielādējot attēlus: ${error.response?.data?.error || error.message}`);
        }
      } else {
        alert('Kļūda augšupielādējot attēlus');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin-token');
      if (!token) {
        console.error('No authentication token found');
        navigate('/admin/login');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      const submitData = {
        ...formData,
        price: formData.price && formData.price.trim() !== '' ? parseFloat(formData.price) : undefined
      };
      
      console.log('Submitting data:', submitData);
      console.log('Original formData.price:', formData.price);
      console.log('Processed price:', submitData.price);
      
      let produktId: number;
      
      if (editingId) {
        await axios.put(`/api/produkti/${editingId}`, submitData, { headers });
        produktId = editingId;
      } else {
        const response = await axios.post('/api/produkti', submitData, { headers });
        produktId = response.data.data.id;
      }

      // Upload images if any are selected
      if (selectedImages && selectedImages.length > 0) {
        await uploadImages(produktId, selectedImages);
      }

      // Reset form and refresh data
      setFormData({ name: '', description: '', price: '', category: '', available: true, featured: false });
      setSelectedImages(null);
      setShowForm(false);
      setEditingId(null);
      setShowCategoryInput(false); // Reset category input state
      
      // Refresh products and categories
      await fetchPreces();
    } catch (error) {
      console.error('Error saving prece:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-user');
          navigate('/admin/login');
          alert('Autentifikācijas kļūda. Lūdzu ielogojieties atkārtoti.');
        } else {
          alert(`Kļūda saglabājot produktu: ${error.response?.data?.error || error.message}`);
        }
      } else {
        alert('Kļūda saglabājot produktu');
      }
    }
  };

  const handleEdit = (prece: Prece) => {
    setFormData({
      name: prece.name,
      description: prece.description,
      price: prece.price?.toString() || '',
      category: prece.category || '',
      available: prece.available,
      featured: prece.featured
    });
    setEditingId(prece.id);
    setShowForm(true);
    
    // Check if the category exists in the dropdown or if we need to show input
    const categoryExists = existingCategories.includes(prece.category || '');
    const hasCategory = (prece.category || '') !== '';
    setShowCategoryInput(!categoryExists && hasCategory);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo preci?')) {
      try {
        const token = localStorage.getItem('admin-token');
        await axios.delete(`/api/produkti/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchPreces();
      } catch (error) {
        console.error('Error deleting prece:', error);
        alert('Kļūda dzēšot produktu');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', available: true, featured: false });
    setSelectedImages(null);
    setEditingId(null);
    setShowForm(false);
    setShowCategoryInput(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowCategoryInput(true);
      setFormData({ ...formData, category: '' });
    } else {
      setShowCategoryInput(false);
      setFormData({ ...formData, category: value });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-admin-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-primary mx-auto mb-4"></div>
          <p className="text-admin-text-secondary">Notiek autentifikācija...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-admin-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Kļūda: {error}</p>
          <button
            onClick={() => {
              setError(null);
              navigate('/admin');
            }}
            className="admin-button-primary"
          >
            Atgriezties uz paneli
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-admin-bg-primary">
      {/* Header */}
      <header className="bg-admin-bg-secondary shadow-admin">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-admin-text-primary">Produkti</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="text-admin-text-secondary hover:text-admin-text-primary transition-colors"
              >
                ← Atpakaļ uz paneli
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                className="admin-button-danger"
              >
                Iziet
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        <div className="admin-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-admin-text-primary">
              {showForm ? (editingId ? 'Rediģēt produktu' : 'Pievienot produktu') : 'Pārvaldīt produktus'}
            </h2>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="admin-button-primary"
              >
                Pievienot jaunu
              </button>
            ) : (
              <button
                onClick={resetForm}
                className="text-admin-text-secondary hover:text-admin-text-primary transition-colors"
              >
                Atcelt
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                  {/* Name Field - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                      Nosaukums *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>

                  {/* Description Field - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                      Apraksts *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="admin-input w-full resize-none"
                    />
                  </div>

                  {/* Price and Category in Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                        Cena (EUR)
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*\.?[0-9]*"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="admin-input w-full"
                        placeholder="Cena"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                        Kategorija
                      </label>
                      {existingCategories.length > 0 ? (
                        <div className="space-y-2">
                          <select
                            value={showCategoryInput ? 'new' : (formData.category || '')}
                            onChange={handleCategoryChange}
                            className="admin-input w-full"
                          >
                            <option value="">-- Izvēlieties kategoriju --</option>
                            {existingCategories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                            <option value="new">+ Pievienot jaunu kategoriju</option>
                          </select>
                          {showCategoryInput && (
                            <input
                              type="text"
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              className="admin-input w-full"
                              placeholder="Ievadiet jaunu kategoriju"
                              autoFocus
                            />
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="admin-input w-full"
                          placeholder="Produkta kategorija"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.available}
                        onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="text-sm font-medium text-admin-text-secondary">
                        Pieejams
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="text-sm font-medium text-admin-text-secondary">
                        Izcelts produkts
                      </span>
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {editingId ? 'Atjaunināt' : 'Pievienot'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Atcelt
                    </button>
                  </div>
                </div>

                {/* Right Column - Images */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                      Attēli
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setSelectedImages(e.target.files)}
                      className="admin-input"
                    />
                    <p className="text-sm text-admin-text-secondary mt-1">
                      Var izvēlēties vairākus attēlus. Pirmais būs galvenais attēls.
                    </p>
                  </div>
                  
                  {/* Image Previews */}
                  {selectedImages && selectedImages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
                        Izvēlētie attēli:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from(selectedImages).map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                            {index === 0 && (
                              <span className="absolute top-2 left-2 bg-admin-accent-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                                Galvenais
                              </span>
                            )}
                            <p className="text-xs text-admin-text-secondary mt-2 truncate px-1">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Existing Images Preview for Edit Mode */}
                  {editingId && preces.find(p => p.id === editingId)?.images && preces.find(p => p.id === editingId)!.images!.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
                        Esošie attēli:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {preces.find(p => p.id === editingId)!.images!.map((image, index) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border">
                              <img
                                src={image.url}
                                alt={`Existing ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                            {image.is_main && (
                              <span className="absolute top-2 left-2 bg-admin-accent-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                                Galvenais
                              </span>
                            )}
                            <p className="text-xs text-admin-text-secondary mt-2 truncate px-1">
                              {image.original_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legacy image_url Preview for Edit Mode */}
                  {editingId && preces.find(p => p.id === editingId)?.image_url && !preces.find(p => p.id === editingId)?.images?.length && (
                    <div>
                      <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
                        Esošais attēls (legacy):
                      </h4>
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border max-w-xs">
                        <img
                          src={preces.find(p => p.id === editingId)!.image_url}
                          alt="Legacy image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Preces List */}
        <div className="admin-card">
          <div className="px-6 py-4 border-b border-admin-border">
            <h3 className="text-lg font-medium text-admin-text-primary">
              Esošie produkti ({preces.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-success mx-auto"></div>
            </div>
          ) : preces.length === 0 ? (
            <div className="p-6 text-center text-admin-text-secondary">
              Nav pievienots neviens produkts
            </div>
          ) : (
            <div className="divide-y divide-admin-border">
              {preces.map((prece) => (
                <div key={prece.id} className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Product Image */}
                    {(prece.main_image || prece.image_url) && (
                      <div className="w-full lg:w-48 h-48 flex-shrink-0">
                        <img
                          src={prece.main_image?.url || prece.image_url}
                          alt={prece.name}
                          className="w-full h-full object-cover rounded-lg border-2 border-admin-border"
                        />
                      </div>
                    )}
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h4 className="text-xl font-semibold text-admin-text-primary truncate">
                              {prece.name}
                            </h4>
                            {prece.price !== undefined && prece.price !== null && (
                              <span className="text-2xl font-bold text-admin-accent-success">
                                €{prece.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {prece.available ? (
                              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                                Pieejams
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                                Nav pieejams
                              </span>
                            )}
                            {prece.featured && (
                              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                                Izcelts
                              </span>
                            )}
                            {prece.category && (
                              <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                                {prece.category}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-3 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(prece)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Rediģēt
                          </button>
                          <button
                            onClick={() => handleDelete(prece.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Dzēst
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-admin-text-secondary leading-relaxed">
                          {prece.description.length > 300
                            ? `${prece.description.substring(0, 200)}...`
                            : prece.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-admin-text-secondary">
                          <span>
                            {new Date(prece.created_at).toLocaleDateString('lv-LV')}
                          </span>
                          {prece.images && prece.images.length > 0 && (
                            <span>
                              {prece.images.length} attēl{prece.images.length === 1 ? 's' : 'i'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}