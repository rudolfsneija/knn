import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Aktualitate {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export function Aktualitates() {
  const [aktualitates, setAktualitates] = useState<Aktualitate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAktualitates();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē aktualitātes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aktualitātes</h1>
          <p className="text-lg text-gray-600">
            Sekojiet līdzi jaunākajām ziņām un atjauninājumiem
          </p>
        </div>

        {aktualitates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Pašlaik nav pieejamas aktualitātes.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aktualitates.map((aktualitate) => (
              <div key={aktualitate.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {aktualitate.image_url && (
                  <img
                    src={aktualitate.image_url}
                    alt={aktualitate.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {aktualitate.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {aktualitate.content.length > 150
                      ? `${aktualitate.content.substring(0, 150)}...`
                      : aktualitate.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(aktualitate.created_at).toLocaleDateString('lv-LV')}
                    </span>
                    <Link
                      to={`/aktualitates/${aktualitate.id}`}
                      className="text-primary-800 hover:text-primary-900 font-medium"
                    >
                      Lasīt vairāk →
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
