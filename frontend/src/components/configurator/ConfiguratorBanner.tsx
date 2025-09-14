import { useNavigate } from 'react-router-dom';

interface ConfiguratorBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  overlay?: boolean;
  className?: string;
}

export function ConfiguratorBanner({
  title,
  description,
  buttonText,
  buttonHref = '/konfigurators',
  backgroundImage,
  backgroundColor,
  textColor = 'white',
  overlay = true,
  className = '',
}: ConfiguratorBannerProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonHref.startsWith('http')) {
      window.open(buttonHref, '_blank');
    } else {
      navigate(buttonHref);
    }
  };

  return (
    <div
      className={`relative overflow-hidden mb-16 rounded-lg ${
        !backgroundImage && !backgroundColor
          ? 'bg-gradient-to-br from-primary-800 to-primary-900'
          : backgroundColor || ''
      } ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      {overlay && backgroundImage && <div className="absolute inset-0 bg-black bg-opacity-65" />}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1
            className="text-2xl md:text-2xl lg:text-3xl font-bold mb-6"
            style={{ color: textColor }}
          >
            {title}
          </h1>

          <p className="text-md md:text-lg mb-8 max-w-3xl mx-auto" style={{ color: textColor }}>
            {description}
          </p>

          {/* Call-to-action button */}
          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className="px-8 py-3 rounded-lg font-semibold transition-colors inline-block bg-white text-primary-400 hover:bg-gray-100"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
