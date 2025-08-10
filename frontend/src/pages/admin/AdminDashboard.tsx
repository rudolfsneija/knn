import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface Stats {
  aktualitates: number;
  produkti: number;
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ aktualitates: 0, produkti: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const [aktualitatesRes, produktiRes] = await Promise.all([
        axios.get('/api/aktualitates'),
        axios.get('/api/produkti')
      ]);
      setStats({
        aktualitates: aktualitatesRes.data.success ? aktualitatesRes.data.data.length : 0,
        produkti: produktiRes.data.success ? produktiRes.data.data.length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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
              <h1 className="text-3xl font-bold text-admin-text-primary">Administratora panelis</h1>
              <p className="text-admin-text-secondary">Sveicināts, {user.username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-admin-text-secondary hover:text-admin-text-primary transition-colors"
              >
                Skatīt vietni
              </Link>
              <button
                onClick={handleLogout}
                className="admin-button-danger"
              >
                Iziet
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="admin-card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-admin-accent-primary/20">
                <svg className="w-6 h-6 text-admin-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-admin-text-secondary">Aktualitātes</p>
                <p className="text-2xl font-semibold text-admin-text-primary">
                  {loading ? '...' : stats.aktualitates}
                </p>
              </div>
            </div>
          </div>

          <div className="admin-card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-admin-accent-success/20">
                <svg className="w-6 h-6 text-admin-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-admin-text-secondary">Produkti</p>
                <p className="text-2xl font-semibold text-admin-text-primary">
                  {loading ? '...' : stats.produkti}
                </p>
              </div>
            </div>
          </div>

          <div className="admin-card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-500/20">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-admin-text-secondary">Kopā ieraksti</p>
                <p className="text-2xl font-semibold text-admin-text-primary">
                  {loading ? '...' : stats.aktualitates + stats.produkti}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-card p-6">
            <h2 className="text-xl font-semibold text-admin-text-primary mb-4">Aktualitātes</h2>
            <p className="text-admin-text-secondary mb-4">
              Pārvaldiet aktualitātes un ziņas
            </p>
            <div className="space-y-3">
              <Link
                to="/admin/aktualitates"
                className="block admin-button-primary text-center"
              >
                Pārvaldīt aktualitātes
              </Link>
            </div>
          </div>

          <div className="admin-card p-6">
            <h2 className="text-xl font-semibold text-admin-text-primary mb-4">Produkti</h2>
            <p className="text-admin-text-secondary mb-4">
              Pārvaldiet produktu katalogu
            </p>
            <div className="space-y-3">
              <Link
                to="/admin/preces"
                className="block bg-admin-accent-success hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                Pārvaldīt produktus
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}