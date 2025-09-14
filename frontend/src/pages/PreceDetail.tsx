import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';

interface Prece {
  id: number;
  name: string;
  description: string;
  price?: number;
  category?: string;
  available: boolean;
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
      const response = await axios.get(`/api/produkti/${id}`);
      if (response.data.success) {
        setPrece(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
        setError('Prece netika atrasta');
      }
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800 mx-auto"></div>
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
          <Link to="/preces" className="text-primary-400 hover:text-primary-500 font-medium">
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
          className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atgriezties pie precēm
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {(prece.main_image?.url || prece.image_url) && (
            <div className="relative flex justify-center">
              <div className="relative">
                <img
                  src={prece.main_image?.url || prece.image_url}
                  alt={prece.name}
                  className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          <div className={prece.main_image?.url || prece.image_url ? '' : 'lg:col-span-2'}>
            {prece.category && (
              <div className="mb-2">
                <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                  {prece.category}
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex-1">{prece.name}</h1>
              {!prece.available && !(prece.main_image?.url || prece.image_url) && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium ml-4 flex-shrink-0">
                  Nav pieejams
                </span>
              )}
            </div>

            {!prece.available && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  Šis produkts pašlaik nav pieejams. Lūdzu, sazinieties ar mums, lai uzzinātu par
                  pieejamību.
                </p>
              </div>
            )}

            {prece.price !== undefined && prece.price !== null && (
              <div className="mb-8">
                <span className="text-4xl font-bold text-primary-400">
                  €{prece.price.toFixed(2)}
                </span>
              </div>
            )}

            <div className="mb-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {prece.description}
                </div>
              </div>
            </div>

            <div>
              <a
                href="/sazinai?topic=preces"
                className={`block w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center ${
                  prece.available
                    ? 'bg-primary-600 text-white hover:bg-primary-600'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                {...(!prece.available && {
                  onClick: (e) => e.preventDefault(),
                  'aria-disabled': true,
                })}
              >
                {prece.available ? 'Pieprasīt piedāvājumu' : 'Nav pieejams'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
