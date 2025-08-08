import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';

interface Prece {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export function Preces() {
  const [preces, setPreces] = useState<Prece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreces();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē preces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mūsu preces</h1>
          <p className="text-lg text-gray-600">
            Atklājiet mūsu produktu klāstu, kas palīdzēs jūsu biznesam
          </p>
        </div>

        {preces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Pašlaik nav pieejamas preces.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preces.map((prece) => (
              <div key={prece.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {prece.image_url && (
                  <img
                    src={prece.image_url}
                    alt={prece.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {prece.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {prece.description.length > 150
                      ? `${prece.description.substring(0, 150)}...`
                      : prece.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      €{prece.price.toFixed(2)}
                    </span>
                    <Link
                      to={`/preces/${prece.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Skatīt detaļas
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}