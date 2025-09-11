import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  title: string;
  onLogout: () => void;
}

export function AdminHeader({ title, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-admin-bg-secondary shadow-admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-admin-text-primary">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="text-admin-text-secondary hover:text-admin-text-primary transition-colors"
            >
              ← Atpakaļ uz paneli
            </Link>
            <button
              onClick={onLogout}
              className="admin-button-danger"
            >
              Iziet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
