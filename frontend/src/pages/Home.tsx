import { useState, useEffect } from 'react';
import { FileText, GraduationCap, Wifi, Cctv } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { heroSlides } from '../data/heroSlides';

interface Aktualitate {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published: boolean;
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

export function Home() {
  const [aktualitates, setAktualitates] = useState<Aktualitate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentAktualitates();
  }, []);

  const fetchRecentAktualitates = async () => {
    try {
      const response = await axios.get('/api/aktualitates');
      if (response.data.success) {
        // Filter to only show published articles and take the 3 most recent
        const publishedAktualitates = response.data.data
          .filter((aktualitate: Aktualitate) => aktualitate.published)
          .slice(0, 3);
        setAktualitates(publishedAktualitates);
      } else {
        console.error('API Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching aktualitātes:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white">
      {/* Hero Slideshow */}
      <HeroSlideshow
        slides={heroSlides}
        autoAdvance={true}
        autoAdvanceInterval={6000}
        showIndicators={true}
        showNavigation={true}
        className="min-h-[500px]"
      />

      {/* Pakalpojumi Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mūsu pakalpojumi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/pakalpojumi/nkl-prasibu-realizesana"
              className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-lg transition-all duration-300 block"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NKDL prasību realizēšana</h3>
              <p className="text-gray-600 mb-4">
                Nodrošinām obligāto minimālo kiberdrošības prasību ieviešanu un dokumentu kārtošanu
                visu veidu uzņēmumos.
              </p>
              <div className="text-right">
                <span className="text-primary-400 hover:text-primary-500 font-medium">
                  Uzzināt vairāk →
                </span>
              </div>
            </Link>

            <Link
              to="/pakalpojumi/it-drosibas-apmacibas"
              className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-lg transition-all duration-300 block"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">IT drošības apmācības</h3>
              <p className="text-gray-600 mb-4">
                Nodrošinām IT drošības apmācības darbiniekiem un IT personālam, koncentrējoties uz
                svarīgākajiem mūsdienu kiberdrošības aspektiem.
              </p>
              <div className="text-right">
                <span className="text-primary-400 hover:text-primary-500 font-medium">
                  Uzzināt vairāk →
                </span>
              </div>
            </Link>

            <Link
              to="/pakalpojumi/bezvadu-wifi-risinajumi"
              className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-lg transition-all duration-300 block"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wi-Fi risinājumi</h3>
              <p className="text-gray-600 mb-4">
                Piedāvājam modernu industrijas bezvada tīkla risinājumu, kurš aptver dažādas
                funkcijas plašam klientu lokam.
              </p>
              <div className="text-right">
                <span className="text-primary-400 hover:text-primary-500 font-medium">
                  Uzzināt vairāk →
                </span>
              </div>
            </Link>

            <Link
              to="/pakalpojumi/videonovero-sistemas"
              className="text-center p-6 bg-secondary-50 rounded-lg hover:shadow-lg transition-all duration-300 block"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Cctv className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Videonovērošanas sistēmas</h3>
              <p className="text-gray-600 mb-4">
                Videonovērošanas sistēmu izplatīšana, uzstādīšana un noma dažāda veida objektiem.
              </p>

              <div className="text-right">
                <span className="text-primary-400 hover:text-primary-500 font-medium">
                  Uzzināt vairāk →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Aktualitātes Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Jaunākās aktualitātes</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-800 mx-auto"></div>
              <p className="mt-4 text-gray-600">Ielādē aktualitātes...</p>
            </div>
          ) : aktualitates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Pašlaik nav pieejamas aktualitātes.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {aktualitates.map((aktualitate) => (
                  <a
                    key={aktualitate.id}
                    href={`/aktualitates/${aktualitate.id}`}
                    className="bg-secondary-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer block"
                  >
                    {(aktualitate.main_image?.url || aktualitate.image_url) && (
                      <img
                        src={aktualitate.main_image?.url || aktualitate.image_url}
                        alt={aktualitate.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {aktualitate.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {aktualitate.excerpt ||
                          (aktualitate.content.length > 120
                            ? `${aktualitate.content.substring(0, 120)}...`
                            : aktualitate.content)}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(aktualitate.created_at).toLocaleDateString('lv-LV')}
                        </span>
                        <span className="text-primary-400 hover:text-primary-500 font-medium">
                          Lasīt vairāk →
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* <div className="text-center">
                <a
                  href="/aktualitates"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center"
                >
                  Skatīt visas aktualitātes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div> */}
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Gatavi uzsākt sadarbību?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sazinieties ar mums jau šodien un uzziniet vairāk par mūsu pakalpojumiem
          </p>
          <a
            href="/sazinai"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-block"
          >
            Sazināties ar mums
          </a>
        </div>
      </div>
    </div>
  );
}
