import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';

interface Aktualitate {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published: boolean;
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

export function AdminAktualitates() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [aktualitates, setAktualitates] = useState<Aktualitate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    published: false
  });
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

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
    setTheme('admin');
  }, [setTheme]);

  const fetchAktualitates = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin-token');
      console.log('Auth token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        console.error('No authentication token found');
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('/api/aktualitates', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setAktualitates(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching aktualitātes:', error);
      if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
        console.error('Authentication failed, removing token and redirecting to login');
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        navigate('/admin/login');
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
    fetchAktualitates();
  }, [user, navigate, fetchAktualitates]);  const uploadImages = async (aktualitateId: number, files: FileList) => {
    try {
      const token = localStorage.getItem('admin-token');
      const uploadPromises = Array.from(files).map(async (file, index) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('isMain', index === 0 ? 'true' : 'false'); // First image is main

        return axios.post(`/api/aktualitates/${aktualitateId}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      });

      await Promise.all(uploadPromises);
      fetchAktualitates(); // Refresh to show uploaded images
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Kļūda augšupielādējot attēlus');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin-token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      let aktualitateId: number;
      
      if (editingId) {
        await axios.put(`/api/aktualitates/${editingId}`, formData, { headers });
        aktualitateId = editingId;
      } else {
        const response = await axios.post('/api/aktualitates', formData, { headers });
        aktualitateId = response.data.data.id;
      }

      // Upload images if any are selected
      if (selectedImages && selectedImages.length > 0) {
        await uploadImages(aktualitateId, selectedImages);
      }

      setFormData({ title: '', content: '', excerpt: '', published: false });
      setSelectedImages(null);
      setShowForm(false);
      setEditingId(null);
      fetchAktualitates();
    } catch (error) {
      console.error('Error saving aktualitāte:', error);
      alert('Kļūda saglabājot aktualitāti');
    }
  };

  const handleEdit = (aktualitate: Aktualitate) => {
    setFormData({
      title: aktualitate.title,
      content: aktualitate.content,
      excerpt: aktualitate.excerpt || '',
      published: aktualitate.published
    });
    setEditingId(aktualitate.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo aktualitāti?')) {
      try {
        const token = localStorage.getItem('admin-token');
        await axios.delete(`/api/aktualitates/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchAktualitates();
      } catch (error) {
        console.error('Error deleting aktualitāte:', error);
        alert('Kļūda dzēšot aktualitāti');
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', excerpt: '', published: false });
    setSelectedImages(null);
    setEditingId(null);
    setShowForm(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-admin-bg-primary">
      {/* Header */}
      <header className="bg-admin-bg-secondary shadow-admin">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-admin-text-primary">Aktualitātes</h1>
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
              {editingId ? 'Rediģēt aktualitāti' : 'Pievienot jaunu aktualitāti'}
            </h2>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="admin-button-primary"
              >
                Pievienot aktualitāti
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ title: '', content: '', excerpt: '', published: false });
                  setSelectedImages(null);
                }}
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
                  {/* Title Field - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                      Virsraksts *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>

                  {/* Content Field - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                      Saturs *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="admin-input w-full resize-none"
                    />
                  </div>

                  {/* Excerpt Field - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                      Īss apraksts (excerpt)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="admin-input w-full resize-none"
                      placeholder="Īss aktualitātes apraksts priekšskatījumam"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="mr-2 h-4 w-4"
                      />
                      <span className="text-sm font-medium text-admin-text-secondary">
                        Publicēt uzreiz
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
                      className="admin-input w-full"
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
                  {editingId && aktualitates.find(a => a.id === editingId)?.images && aktualitates.find(a => a.id === editingId)!.images!.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
                        Esošie attēli:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {aktualitates.find(a => a.id === editingId)!.images!.map((image, index) => (
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
                  {editingId && aktualitates.find(a => a.id === editingId)?.image_url && !aktualitates.find(a => a.id === editingId)?.images?.length && (
                    <div>
                      <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
                        Esošais attēls (legacy):
                      </h4>
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border max-w-xs">
                        <img
                          src={aktualitates.find(a => a.id === editingId)!.image_url}
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

        {/* Aktualitātes List */}
        <div className="admin-card">
          <div className="px-6 py-4 border-b border-admin-border">
            <h3 className="text-lg font-medium text-admin-text-primary">
              Esošās aktualitātes ({aktualitates.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-primary mx-auto"></div>
            </div>
          ) : aktualitates.length === 0 ? (
            <div className="p-6 text-center text-admin-text-secondary">
              Nav pievienota neviena aktualitāte
            </div>
          ) : (
            <div className="divide-y divide-admin-border">
              {aktualitates.map((aktualitate) => (
                <div key={aktualitate.id} className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Article Image */}
                    {(aktualitate.main_image || aktualitate.image_url) && (
                      <div className="w-full lg:w-48 h-48 flex-shrink-0">
                        <img
                          src={aktualitate.main_image?.url || aktualitate.image_url}
                          alt={aktualitate.title}
                          className="w-full h-full object-cover rounded-lg border-2 border-admin-border"
                        />
                      </div>
                    )}
                    
                    {/* Article Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h4 className="text-xl font-semibold text-admin-text-primary truncate">
                              {aktualitate.title}
                            </h4>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {aktualitate.published ? (
                              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                                Publicēts
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium">
                                Melnraksts
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-3 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(aktualitate)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Rediģēt
                          </button>
                          <button
                            onClick={() => handleDelete(aktualitate.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Dzēst
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-admin-text-secondary leading-relaxed">
                          {aktualitate.excerpt || (aktualitate.content.length > 300
                            ? `${aktualitate.content.substring(0, 200)}...`
                            : aktualitate.content)}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-admin-text-secondary">
                          <span>
                            {new Date(aktualitate.created_at).toLocaleDateString('lv-LV')}
                          </span>
                          {aktualitate.images && aktualitate.images.length > 0 && (
                            <span>
                              {aktualitate.images.length} attēl{aktualitate.images.length === 1 ? 's' : 'i'}
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