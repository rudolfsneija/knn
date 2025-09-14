import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  // Set admin theme when component mounts
  useEffect(() => {
    setTheme('admin');
  }, [setTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Nepareizs lietotājvārds vai parole');
      }
    } catch (error) {
      setError('Pieslēgšanās kļūda. Lūdzu mēģiniet vēlreiz.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-admin-bg-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-admin-text-primary">
            Administratora pieslēgšanās
          </h2>
          <p className="mt-2 text-center text-sm text-admin-text-secondary">
            Pieslēdzieties sistēmas administrēšanai
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-admin-text-secondary mb-2"
              >
                Lietotājvārds
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="admin-input w-full"
                placeholder="Ievadiet lietotājvārdu"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-admin-text-secondary mb-2"
              >
                Parole
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="admin-input w-full"
                placeholder="Ievadiet paroli"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-admin-accent-danger/10 border border-admin-accent-danger/20 p-4">
              <div className="text-sm text-admin-accent-danger">{error}</div>
            </div>
          )}

          <div>
            <button type="submit" disabled={isLoading} className="admin-button-primary w-full">
              {isLoading ? 'Pieslēdzas...' : 'Pieslēgties'}
            </button>
          </div>

          <div className="text-center">
            <a href="/" className="text-sm text-admin-accent-primary hover:text-blue-400">
              ← Atgriezties uz galveno lapu
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
