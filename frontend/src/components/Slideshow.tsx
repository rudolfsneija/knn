import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types for the slideshow
export interface SlideButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttons?: SlideButton[];
  overlay?: boolean; // For dark overlay on background images
}

interface SlideshowProps {
  slides: Slide[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export function Slideshow({
  slides,
  autoAdvance = true,
  autoAdvanceInterval = 15000,
  showIndicators = true,
  showNavigation = true,
  className = '',
}: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-advance functionality
  useEffect(() => {
    if (!autoAdvance || isHovered || slides.length <= 1) return;

    const interval = setInterval(nextSlide, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [autoAdvance, autoAdvanceInterval, isHovered, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Slideshow"
    >
      {/* Slide container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-full flex-shrink-0 relative min-h-[400px] ${
              !slide.backgroundImage && !slide.backgroundColor
                ? 'bg-gradient-to-br from-primary-800 to-primary-900'
                : ''
            }`}
            style={{
              backgroundColor: slide.backgroundColor || 'transparent',
              backgroundImage: slide.backgroundImage ? `url(${slide.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden={index !== currentSlide}
          >
            {/* Overlay for better text readability */}
            {slide.overlay && slide.backgroundImage && (
              <div className="absolute inset-0 bg-black bg-opacity-65" />
            )}

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <div className="text-center">
                <h1
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
                  style={{ color: slide.textColor || 'white' }}
                >
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p
                    className="text-xl md:text-2xl lg:text-3xl mb-6"
                    style={{ color: slide.textColor || 'white' }}
                  >
                    {slide.subtitle}
                  </p>
                )}

                {slide.description && (
                  <p
                    className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
                    style={{ color: slide.textColor || 'white' }}
                  >
                    {slide.description}
                  </p>
                )}

                {/* Call-to-action buttons */}
                {slide.buttons && slide.buttons.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {slide.buttons.map((button, buttonIndex) => (
                      <a
                        key={buttonIndex}
                        href={button.href}
                        className={`px-8 py-3 rounded-lg font-semibold transition-colors inline-block ${
                          button.variant === 'primary'
                            ? 'bg-white text-primary-400 hover:bg-gray-100'
                            : 'border-2 border-secondary-50 text-white hover:bg-secondary-50 hover:text-gray-900'
                        }`}
                      >
                        {button.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          {/* Mobile arrows - positioned at bottom */}
          <button
            onClick={prevSlide}
            className="absolute left-2 bottom-16 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white transition-all duration-200 z-20 sm:hidden"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 bottom-16 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white transition-all duration-200 z-20 sm:hidden"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Desktop arrows - positioned at center */}
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-40 text-white transition-all duration-200 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-40 text-white transition-all duration-200 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Slide indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white bg-opacity-30 hover:bg-opacity-40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
