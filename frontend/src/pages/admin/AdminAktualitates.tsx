import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import axios from 'axios';

interface Aktualitate {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
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
    image_url: ''
  });

  // Set admin theme when component mounts
  useEffect(() => {
    setTheme('admin');
  }, [setTheme]);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAktualitates();
  }, [user, navigate]);

  const fetchAktualitates = async () => {
    try {
      const response = await axios.get('/api/aktualitates');
      if (response.data.success) {
        setAktualitates(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
      }
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
        await axios.put(`/api/aktualitates/${editingId}`, formData);
      } else {
        await axios.post('/api/aktualitates', formData);
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
        await axios.delete(`/api/aktualitates/${id}`);
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
                  setFormData({ title: '', content: '', image_url: '' });
                }}
                className="text-admin-text-secondary hover:text-admin-text-primary transition-colors"
              >
                Atcelt
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                  Virsraksts *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                  Saturs *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                  Attēla URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="admin-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="admin-button-primary"
                >
                  {editingId ? 'Atjaunināt' : 'Pievienot'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="admin-button-secondary"
                >
                  Atcelt
                </button>
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
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-admin-text-primary mb-2">
                        {aktualitate.title}
                      </h4>
                      <p className="text-admin-text-secondary mb-2 line-clamp-2">
                        {aktualitate.content.length > 200
                          ? `${aktualitate.content.substring(0, 200)}...`
                          : aktualitate.content}
                      </p>
                      <p className="text-sm text-admin-text-secondary">
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