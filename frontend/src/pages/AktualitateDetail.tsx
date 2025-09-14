import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';

interface Aktualitate {
  id: number;
  title: string;
  content: string;
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

export function AktualitateDetail() {
  const { id } = useParams<{ id: string }>();
  const [aktualitate, setAktualitate] = useState<Aktualitate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAktualitate(id);
    }
  }, [id]);

  const fetchAktualitate = async (id: string) => {
    try {
      const response = await axios.get(`/api/aktualitates/${id}`);
      if (response.data.success) {
        setAktualitate(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
        setError('Aktualitāte netika atrasta');
      }
    } catch (error) {
      console.error('Error fetching aktualitāte:', error);
      setError('Aktualitāte netika atrasta');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē aktualitāti...</p>
        </div>
      </div>
    );
  }

  if (error || !aktualitate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Aktualitāte netika atrasta</h1>
          <Link to="/aktualitates" className="text-primary-400 hover:text-primary-500 font-medium">
            ← Atgriezties pie aktualitātēm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/aktualitates"
          className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Atgriezties pie aktualitātēm
        </Link>

        <article>
          {(aktualitate.main_image?.url || aktualitate.image_url) && (
            <img
              src={aktualitate.main_image?.url || aktualitate.image_url}
              alt={aktualitate.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />
          )}

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {aktualitate.title}
            </h1>
            <p className="text-gray-600">
              Publicēts:{' '}
              {new Date(aktualitate.created_at).toLocaleDateString('lv-LV', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {aktualitate.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
