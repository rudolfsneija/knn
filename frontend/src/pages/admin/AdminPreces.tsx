import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../config/api';

interface Prece {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export function AdminPreces() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [preces, setPreces] = useState<Prece[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchPreces();
  }, [user, navigate]);

  const fetchPreces = async () => {
    try {
      const response = await api.get('/api/produkti');
      setPreces(response.data.data);
    } catch (error) {
      console.error('Error fetching preces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      if (editingId) {
        await api.put(`/api/produkti/${editingId}`, submitData);
      } else {
        await api.post('/api/produkti', submitData);
      }
      setFormData({ name: '', description: '', price: '', image_url: '' });
      setShowForm(false);
      setEditingId(null);
      fetchPreces();
    } catch (error) {
      console.error('Error saving prece:', error);
    }
  };

  const handleEdit = (prece: Prece) => {
    setFormData({
      name: prece.name,
      description: prece.description,
      price: prece.price.toString(),
      image_url: prece.image_url || ''
    });
    setEditingId(prece.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo preci?')) {
      try {
        await api.delete(`/api/produkti/${id}`);
        fetchPreces();
      } catch (error) {
        console.error('Error deleting prece:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', image_url: '' });
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
              <h1 className="text-3xl font-bold text-gray-900">Produkti</h1>
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
                {showForm ? (editingId ? 'Rediģēt produktu' : 'Pievienot produktu') : 'Pārvaldīt produktus'}
              </h2>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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
                  Nosaukums *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apraksts *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cena (EUR) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
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

        {/* Preces List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Esošie produkti ({preces.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            </div>
          ) : preces.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nav pievienots neviens produkts
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {preces.map((prece) => (
                <div key={prece.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900 mr-4">
                          {prece.name}
                        </h4>
                        <span className="text-xl font-bold text-green-600">
                          €{prece.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {prece.description.length > 200
                          ? `${prece.description.substring(0, 200)}...`
                          : prece.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(prece.created_at).toLocaleDateString('lv-LV')}
                      </p>
                    </div>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(prece)}
                        className="text-green-600 hover:text-green-800 px-3 py-1 rounded"
                      >
                        Rediģēt
                      </button>
                      <button
                        onClick={() => handleDelete(prece.id)}
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