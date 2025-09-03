import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import type { SearchItem } from '../utils/searchData';

interface SearchResult extends SearchItem {
  score?: number;
}

interface SearchProps {
  isMobile?: boolean;
}

export function Search({ isMobile = false }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { query, setQuery, results, isSearching, loading } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (!query) {
          setIsExpanded(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  // Close on escape key and handle enter for search results
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setIsExpanded(false);
      } else if (event.key === 'Enter' && query.trim() && isOpen) {
        // Navigate to search results page
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setQuery, query, isOpen]);

  // Auto-focus when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearchIconClick = () => {
    setIsExpanded(true);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setIsExpanded(false);
  };

  const categoryLabels = {
    aktualitates: 'Aktualitātes',
    services: 'Pakalpojumi',
    preces: 'Preces'
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center">
        {/* Search Icon - always visible on desktop */}
        {!isMobile && (
          <button
            onClick={handleSearchIconClick}
            className={`p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50 ${
              isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            } transition-opacity duration-100`}
            aria-label="Meklēt"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        )}

        {/* Search Input */}
        <div className={`relative overflow-hidden transition-all duration-100 ease-in-out ${
          isExpanded || isMobile 
            ? 'w-full md:w-80 opacity-100' 
            : 'w-0 opacity-0 pointer-events-none'
        }`}>
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder={loading ? "Ielādē..." : "Meklēt..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            disabled={loading}
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
          )}
          {(query || (!loading && !isMobile)) && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Aizvērt meklēšanu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && isSearching && !loading && (isExpanded || isMobile) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto md:w-96 md:right-auto">
          {results?.hasResults ? (
            <div className="p-2">
              {Object.entries(results.grouped).map(([category, items]) => {
                if (items.length === 0) return null;
                
                return (
                  <div key={category} className="mb-4 last:mb-0">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      {categoryLabels[category as keyof typeof categoryLabels]} ({items.length})
                    </div>
                    {items.slice(0, 3).map((item: SearchResult) => (
                      <Link
                        key={item.id}
                        to={item.url}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery('');
                          setIsExpanded(false);
                        }}
                        className="block px-3 py-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                      </Link>
                    ))}
                    {items.length > 3 && (
                      <div className="px-3 py-1 text-xs text-gray-500 border-t border-gray-100 mt-1">
                        +{items.length - 3} vairāk rezultāti
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* View All Results Link */}
              {results.total > 0 && (
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to={`/search?q=${encodeURIComponent(query)}`}
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpanded(false);
                    }}
                    className="block px-3 py-2 text-center text-primary-800 hover:text-primary-900 font-medium text-sm hover:bg-primary-50 rounded transition-colors"
                  >
                    Skatīt visus rezultātus ({results.total})
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              Nav atrasti rezultāti meklējumam "{query}"
            </div>
          )}
        </div>
      )}

      {/* Show message when search is too short */}
      {isOpen && query.length > 0 && query.length < 2 && !loading && (isExpanded || isMobile) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:w-96 md:right-auto">
          <div className="p-4 text-center text-gray-500 text-sm">
            Ievadiet vismaz 2 simbolus meklēšanai
          </div>
        </div>
      )}
    </div>
  );
}
