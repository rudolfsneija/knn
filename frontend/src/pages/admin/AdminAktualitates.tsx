import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../config/api';

interface Aktualitate {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export function AdminAktualitates() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [aktualitates, setAktualitates] = useState<Aktualitate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAktualitates();
  }, [user, navigate]);

  const fetchAktualitates = async () => {
    try {
      const response = await api.get('/api/aktualitates');
      setAktualitates(response.data.data);
    } catch (error) {
      console.error('Error fetching aktualitātes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/aktualitates/${editingId}`, formData);
      } else {
        await api.post('/api/aktualitates', formData);
      }
      setFormData({ title: '', content: '', image_url: '' });
      setShowForm(false);
      setEditingId(null);
      fetchAktualitates();
    } catch (error) {
      console.error('Error saving aktualitāte:', error);
    }
  };

  const handleEdit = (aktualitate: Aktualitate) => {
    setFormData({
      title: aktualitate.title,
      content: aktualitate.content,
      image_url: aktualitate.image_url || ''
    });
    setEditingId(aktualitate.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo aktualitāti?')) {
      try {
        await api.delete(`/api/aktualitates/${id}`);
        fetchAktualitates();
      } catch (error) {
        console.error('Error deleting aktualitāte:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', image_url: '' });
    setEditingId(null);
    setShowForm(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Aktualitātes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Atpakaļ uz paneli
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Iziet
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {showForm ? (editingId ? 'Rediģēt aktualitāti' : 'Pievienot aktualitāti') : 'Pārvaldīt aktualitātes'}
              </h2>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Pievienot jaunu
                </button>
              ) : (
                <button
                  onClick={resetForm}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Atcelt
                </button>
              )}
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Virsraksts *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saturs *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attēla URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Atjaunināt' : 'Pievienot'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Atcelt
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Aktualitātes List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Esošās aktualitātes ({aktualitates.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : aktualitates.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nav pievienota neviena aktualitāte
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {aktualitates.map((aktualitate) => (
                <div key={aktualitate.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        {aktualitate.title}
                      </h4>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {aktualitate.content.length > 200
                          ? `${aktualitate.content.substring(0, 200)}...`
                          : aktualitate.content}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(aktualitate.created_at).toLocaleDateString('lv-LV')}
                      </p>
                    </div>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(aktualitate)}
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded"
                      >
                        Rediģēt
                      </button>
                      <button
                        onClick={() => handleDelete(aktualitate.id)}
                        className="text-red-600 hover:text-red-800 px-3 py-1 rounded"
                      >
                        Dzēst
                      </button>
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