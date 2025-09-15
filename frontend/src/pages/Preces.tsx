import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { ConfiguratorBanner } from '../components/configurator/ConfiguratorBanner';
import { Slideshow } from '../components/Slideshow';
import { precesSlides } from '../data/precesSlides';

interface Prece {
  id: number;
  name: string;
  description: string;
  price?: number;
  category?: string;
  sub_category?: string;
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

export function Preces() {
  const [preces, setPreces] = useState<Prece[]>([]);
  const [allPreces, setAllPreces] = useState<Prece[]>([]); // Store all products for filtering
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchPreces = async (category: string, subcategory?: string) => {
    try {
      setLoading(true);
      let url = `/api/produkti?category=${encodeURIComponent(category)}`;
      if (subcategory) {
        url += `&sub_category=${encodeURIComponent(subcategory)}`;
      }

      const response = await axios.get(url);
      if (response.data.success) {
        const products = response.data.data;
        setAllPreces(products); // Store all products
        setPreces(products); // Display all products initially

        // Extract unique subcategories from the products
        const uniqueSubcategories = [
          ...new Set(
            products
              .map((product: Prece) => product.sub_category)
              .filter((subcat: string | undefined) => subcat && subcat.trim() !== '')
          ),
        ].sort() as string[];
        setSubcategories(uniqueSubcategories);
      } else {
        console.error('API Error:', response.data.error);
        setPreces([]);
        setAllPreces([]);
        setSubcategories([]);
      }
    } catch (error) {
      console.error('Error fetching preces:', error);
      setPreces([]);
      setAllPreces([]);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      // Fetch categories from the dedicated endpoint
      const response = await axios.get('/api/produkti/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null); // Reset subcategory when changing category
    setPreces([]); // Clear previous products
    fetchPreces(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setPreces([]);
    setAllPreces([]);
    setSubcategories([]);
  };

  const handleSubcategoryFilter = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);

    if (subcategory === null) {
      // Show all products in the category
      setPreces(allPreces);
    } else {
      // Filter products by subcategory
      const filteredProducts = allPreces.filter((product) => product.sub_category === subcategory);
      setPreces(filteredProducts);
    }
  };

  if (loadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē kategorijas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Preces</h1>
        </div>

        {/* Slideshow - only show when choosing categories */}
        {!selectedCategory && (
          <div className="mb-12">
            <Slideshow
              slides={precesSlides}
              autoAdvance={false}
              autoAdvanceInterval={15000}
              showIndicators={true}
              showNavigation={true}
              className="rounded-lg overflow-hidden"
            />
          </div>
        )}

        {/* Show categories if no category is selected */}
        {!selectedCategory && categories.length > 0 && (
          <div id="categories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="bg-secondary-50 shadow-md rounded-lg p-8 text-center transition-all duration-200 hover:shadow-lg group"
              >
                <div className="text-2xl font-bold text-gray-900 group-hover:text-primary-400 transition-colors">
                  {category}
                </div>
                <div className="mt-2 text-gray-600 font-medium group-hover:text-primary-400 ">
                  Skatīt preces →
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Show selected category products */}
        {selectedCategory && (
          <>
            {/* Back button and category title */}
            <div className="mb-8">
              <button
                onClick={handleBackToCategories}
                className="inline-flex items-center text-primary-400 hover:text-primary-500 font-medium mb-4"
              >
                ← Atpakaļ uz kategorijām
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
            </div>

            {/* Alnet Configurator Banner - only for video surveillance categories */}
            {/* {(() => {
              console.log('Selected category:', selectedCategory);
              return (
                selectedCategory?.toLowerCase().includes('video') ||
                selectedCategory?.toLowerCase().includes('novero') ||
                selectedCategory === 'Videonoverosanas sistemas' ||
                selectedCategory === 'Videonovērošanas sistēmas'
              );
            })() && (
              <ConfiguratorBanner
                title="Nepieciešama videonovērošanas sistēma?"
                description="Izmantojiet mūsu konfigurātoru, lai ātri un precīzi noteiktu ideālo videonovērošanas sistēmas licenci jūsu vajadzībām."
                buttonText="Sākt konfigurēt"
                buttonHref="/alnet-konfigurators"
                backgroundImage="/images/milesight.jpg"
              />
            )} */}

            {/* Loading state for products */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-800 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Ielādē preces...</p>
                </div>
              </div>
            )}

            {/* Products section with sidebar */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Subcategory filter sidebar - only show if subcategories exist */}
              {subcategories.length > 0 && (
                <div className="lg:w-56 flex-shrink-0">
                  <div className="sticky top-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Filtrēt
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleSubcategoryFilter(null)}
                        className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors ${
                          selectedSubcategory === null
                            ? 'text-primary-400 bg-secondary-50 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        Viss <span className="text-gray-400">({allPreces.length})</span>
                      </button>
                      {subcategories.map((subcategory) => {
                        const count = allPreces.filter(
                          (p) => p.sub_category === subcategory
                        ).length;
                        return (
                          <button
                            key={subcategory}
                            onClick={() => handleSubcategoryFilter(subcategory)}
                            className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors ${
                              selectedSubcategory === subcategory
                                ? 'text-primary-400 bg-secondary-50 font-medium'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {subcategory} <span className="text-gray-400">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Products content */}
              <div className="flex-1">
                {!loading && preces.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      {selectedSubcategory
                        ? `Nav pieejamas preces apakškategorijā "${selectedSubcategory}".`
                        : `Nav pieejamas preces kategorijā "${selectedCategory}".`}
                    </p>
                  </div>
                )}

                {!loading && preces.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {preces.map((prece) => (
                      <Link
                        key={prece.id}
                        to={`/preces/${prece.id}`}
                        className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block flex flex-col h-full ${
                          !prece.available ? 'opacity-75' : ''
                        }`}
                      >
                        {(prece.main_image?.url || prece.image_url) && (
                          <div className="relative">
                            <img
                              src={prece.main_image?.url || prece.image_url}
                              alt={prece.name}
                              className="w-full object-contain"
                            />
                            {!prece.available && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Nav pieejams
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 flex-1 min-h-[3rem] leading-6 mb-2">
                              {prece.name}
                            </h2>
                            {!prece.available && !(prece.main_image?.url || prece.image_url) && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium ml-2 flex-shrink-0">
                                Nav pieejams
                              </span>
                            )}
                          </div>

                          <div className="mt-auto">
                            <div className="flex items-end justify-between">
                              <span className="text-sm text-primary-400 hover:text-primary-500 font-medium">
                                Skatīt →
                              </span>
                              {prece.price !== undefined && prece.price !== null && (
                                <span className="text-2xl font-bold text-primary-400">
                                  €{prece.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Show message if no categories exist */}
        {!selectedCategory && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Pašlaik nav pieejamas produktu kategorijas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
