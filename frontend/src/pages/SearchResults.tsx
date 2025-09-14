import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, Newspaper, Settings, Package } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import type { SearchItem } from '../utils/searchData';

interface SearchResult extends SearchItem {
  score?: number;
}

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState('');
  const { query, setQuery, results, loading } = useSearch();

  // Get query from URL params on component mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setLocalQuery(urlQuery);
    setQuery(urlQuery);
  }, [searchParams, setQuery]);

  // Update URL when query changes
  const handleQueryChange = (newQuery: string) => {
    setLocalQuery(newQuery);
    setQuery(newQuery);
    if (newQuery) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const categoryLabels = {
    aktualitates: 'Aktualitātes',
    services: 'Pakalpojumi',
    preces: 'Preces',
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aktualitates':
        return <Newspaper className="w-6 h-6 text-secondary-500" />;
      case 'services':
        return <Settings className="w-6 h-6 text-secondary-500" />;
      case 'preces':
        return <Package className="w-6 h-6 text-secondary-500" />;
      default:
        return <SearchIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  const getRelevanceColor = (score?: number) => {
    if (!score) return 'text-green-600';
    const relevance = (1 - score) * 100;
    if (relevance >= 80) return 'text-green-600';
    if (relevance >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const truncateDescription = (description: string, maxLength: number = 200) => {
    if (description.length <= maxLength) return description;

    // Find the last space before the max length
    const truncated = description.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    // If we found a space, cut at that point, otherwise use the original truncation
    if (lastSpaceIndex > 0) {
      return description.substring(0, lastSpaceIndex).trim() + '...';
    }

    return truncated.trim() + '...';
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atgriezties uz sākumlapu
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Meklēšanas rezultāti</h1>

          {/* Search Input */}
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Meklēt..."
              value={localQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Ielādē rezultātus...</p>
          </div>
        ) : !query ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sāciet meklēšanu</h2>
            <p className="text-gray-600">Ievadiet meklējamo vārdu vai frāzi, lai atrastu saturu</p>
          </div>
        ) : !results?.hasResults ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Nav atrasti rezultāti</h2>
            <p className="text-gray-600">
              Nav atrasts saturs meklējumam "<strong>{query}</strong>"
            </p>
            <p className="text-gray-500 mt-2">
              Mēģiniet izmantot citus atslēgvārdus vai pārbaudiet pareizrakstību
            </p>
          </div>
        ) : (
          <div>
            {/* Results Summary */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                Atrasti <strong>{results.total}</strong> rezultāti meklējumam "
                <strong>{query}</strong>"
              </p>
            </div>

            {/* Results by Category */}
            {Object.entries(results.grouped).map(([category, items]) => {
              if (items.length === 0) return null;

              return (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">{getCategoryIcon(category)}</span>
                    {categoryLabels[category as keyof typeof categoryLabels]}
                    <span className="ml-3 text-lg font-normal text-gray-500">({items.length})</span>
                  </h2>

                  <div className="space-y-6">
                    {items.map((item: SearchResult) => (
                      <Link
                        key={item.id}
                        to={item.url}
                        className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-primary-600 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-primary-400 group-hover:text-primary-500">
                              {item.title}
                            </h3>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                {categoryLabels[category as keyof typeof categoryLabels]}
                              </span>
                              {item.score !== undefined && (
                                <span
                                  className={`text-sm font-medium ${getRelevanceColor(item.score)}`}
                                >
                                  Atbilstība: {Math.round((1 - item.score) * 100)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4">
                          {truncateDescription(item.description)}
                        </p>

                        {/* {item.keywords && item.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.keywords.slice(0, 5).map((keyword, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary-50 text-primary-700"
                              >
                                {keyword}
                              </span>
                            ))}
                            {item.keywords.length > 5 && (
                              <span className="text-xs text-gray-500">
                                +{item.keywords.length - 5} vairāk
                              </span>
                            )}
                          </div>
                        )} */}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
