import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../config/api';

interface Prece {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export function PreceDetail() {
  const { id } = useParams<{ id: string }>();
  const [prece, setPrece] = useState<Prece | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPrece(id);
    }
  }, [id]);

  const fetchPrece = async (id: string) => {
    try {
      const response = await api.get(`/api/produkti/${id}`);
      setPrece(response.data.data);
    } catch (error) {
      console.error('Error fetching prece:', error);
      setError('Prece netika atrasta');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē preci...</p>
        </div>
      </div>
    );
  }

  if (error || !prece) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Prece netika atrasta</h1>
          <Link
            to="/preces"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Atgriezties pie precēm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/preces"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Atgriezties pie precēm
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {prece.image_url && (
            <div>
              <img
                src={prece.image_url}
                alt={prece.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className={prece.image_url ? '' : 'lg:col-span-2'}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {prece.name}
            </h1>

            <div className="mb-8">
              <span className="text-4xl font-bold text-blue-600">
                €{prece.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Apraksts</h2>
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {prece.description}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Pieprasīt piedāvājumu
              </button>
              <a
                href="/sazinai"
                className="block w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Sazināties par šo preci
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Pievienots: {new Date(prece.created_at).toLocaleDateString('lv-LV', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}