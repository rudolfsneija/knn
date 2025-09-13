import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AlnetConfiguratorBanner } from "../components/AlnetConfiguratorBanner";

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

export function Preces() {
  const [preces, setPreces] = useState<Prece[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchPreces = async (category: string) => {
    try {
      setLoading(true);
      const url = `/api/produkti?category=${encodeURIComponent(category)}`;

      const response = await axios.get(url);
      if (response.data.success) {
        setPreces(response.data.data);
      } else {
        console.error("API Error:", response.data.error);
        setPreces([]);
      }
    } catch (error) {
      console.error("Error fetching preces:", error);
      setPreces([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      // Fetch categories from the dedicated endpoint
      const response = await axios.get("/api/produkti/categories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPreces([]); // Clear previous products
    fetchPreces(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setPreces([]);
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
          {/* {!selectedCategory && (
            <p className="text-gray-600">Izvēlieties kategoriju, lai skatītu preces</p>
          )} */}
        </div>

        {/* Alnet Configurator Banner */}
        <AlnetConfiguratorBanner className="mb-8" />

        {/* Show categories if no category is selected */}
        {!selectedCategory && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="bg-white border-2 border-secondary-200 hover:border-primary-800 rounded-lg p-8 text-center transition-all duration-200 hover:shadow-lg group"
              >
                <div className="text-2xl font-bold text-gray-900 group-hover:text-primary-800 transition-colors">
                  {category}
                </div>
                <div className="mt-2 text-gray-600 group-hover:text-primary-700">
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
                className="inline-flex items-center text-primary-800 hover:text-primary-900 font-medium mb-4"
              >
                ← Atpakaļ uz kategorijām
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
            </div>

            {/* Loading state for products */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-800 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Ielādē preces...</p>
                </div>
              </div>
            )}

            {/* Products grid */}
            {!loading && preces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Nav pieejamas preces kategorijā "{selectedCategory}".
                </p>
              </div>
            )}

            {!loading && preces.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {preces.map((prece) => (
                  <Link
                    key={prece.id}
                    to={`/preces/${prece.id}`}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block flex flex-col h-full ${
                      !prece.available ? "opacity-75" : ""
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
                        <h2 className="text-xl font-semibold text-gray-900 flex-1 min-h-[3rem] leading-6">
                          {prece.name}
                        </h2>
                        {!prece.available &&
                          !(prece.main_image?.url || prece.image_url) && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium ml-2 flex-shrink-0">
                              Nav pieejams
                            </span>
                          )}
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-end justify-between">
                          <span className="text-sm text-primary-800 hover:text-primary-900 font-medium">
                            Skatīt preci →
                          </span>
                          {prece.price !== undefined && prece.price !== null && (
                            <span className="text-2xl font-bold text-primary-800">
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
          </>
        )}

        {/* Show message if no categories exist */}
        {!selectedCategory && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Pašlaik nav pieejamas produktu kategorijas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
