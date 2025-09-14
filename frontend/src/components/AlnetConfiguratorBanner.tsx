import { useNavigate } from 'react-router-dom';
import { Cctv, ArrowRight } from 'lucide-react';

interface AlnetConfiguratorBannerProps {
  className?: string;
}

export function AlnetConfiguratorBanner({ className = '' }: AlnetConfiguratorBannerProps) {
  const navigate = useNavigate();

  return (
    <div className={`bg-primary-600 rounded-xl p-4 md:p-6 lg:p-8 text-white ${className}`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="flex items-start md:items-center w-full lg:flex-1">
          <Cctv className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mr-3 md:mr-4 lg:mr-6 flex-shrink-0 mt-1 md:mt-0" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-3 leading-tight">
              Nepieciešama videonovērošanas sistēma?
            </h2>
            <p className="text-gray-100 text-sm md:text-base lg:text-lg leading-relaxed">
              Izmantojiet mūsu konfigurātoru, lai ātri un precīzi noteiktu ideālo videonovērošanas
              sistēmas licenci jūsu vajadzībām.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-auto lg:flex lg:items-center">
          <button
            onClick={() => navigate('/alnet-konfigurators')}
            className="bg-white text-gray-700 hover:text-primary-400 hover:bg-gray-50 font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-lg transition-colors flex items-center justify-center flex-shrink-0 text-sm md:text-base lg:text-lg w-full sm:w-auto"
          >
            Sākt konfigurātoru
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ml-2 lg:ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
