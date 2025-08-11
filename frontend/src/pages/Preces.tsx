import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { WifiQuizBanner } from "../components/WifiQuizBanner";

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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchPreces();
    fetchCategories();
  }, []);

  const fetchPreces = async (category?: string) => {
    try {
      let url = "/api/produkti";
      if (category && category !== "all") {
        url += `?category=${encodeURIComponent(category)}`;
      }

      const response = await axios.get(url);
      if (response.data.success) {
        setPreces(response.data.data);
      } else {
        console.error("API Error:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching preces:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/produkti");
      if (response.data.success) {
        const uniqueCategories = Array.from(
          new Set(
            response.data.data
              .map((prece: Prece) => prece.category)
              .filter(
                (category: string | undefined) =>
                  category && category.trim() !== ""
              )
          )
        ).sort();
        setCategories(uniqueCategories as string[]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    fetchPreces(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ielādē preces...</p>
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

        {/* Wi-Fi Quiz Banner */}
        <WifiQuizBanner className="mb-8" />

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-primary-800 text-white"
                    : "bg-secondary-200 text-gray-700 hover:bg-secondary-300"
                }`}
              >
                Visas preces
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary-800 text-white"
                      : "bg-secondary-200 text-gray-700 hover:bg-secondary-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {preces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {selectedCategory === "all"
                ? "Pašlaik nav pieejamas preces."
                : `Nav pieejamas preces kategorijā "${selectedCategory}".`}
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => handleCategoryChange("all")}
                className="mt-4 text-primary-800 hover:text-primary-900 font-medium"
              >
                Skatīt visas preces
              </button>
            )}
          </div>
        ) : (
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
                    {prece.price !== undefined && prece.price !== null && (
                      <span className="text-2xl font-bold text-primary-800">
                        €{prece.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
