import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Prece {
  id: number;
  name: string;
  description: string;
  price?: number;
  image_url?: string;
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
  };
}

export function Preces() {
  const [preces, setPreces] = useState<Prece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreces();
  }, []);

  const fetchPreces = async () => {
    try {
      const response = await axios.get('/api/produkti');
      if (response.data.success) {
        setPreces(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
      }
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800 mx-auto"></div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {preces.map((prece) => (
              <Link 
                key={prece.id} 
                to={`/preces/${prece.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
              >
                {(prece.main_image?.url || prece.image_url) && (
                  <img
                    src={prece.main_image?.url || prece.image_url}
                    alt={prece.name}
                    className="w-full object-contain"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {prece.name}
                  </h2>
                  {prece.price !== undefined && prece.price !== null && (
                    <span className="text-2xl font-bold text-primary-800">
                      €{prece.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}