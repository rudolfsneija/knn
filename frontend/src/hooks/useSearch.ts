import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import type { SearchItem } from '../utils/searchData';
import { useSearchData } from './useSearchData';

interface SearchResult extends SearchItem {
  score?: number;
}

interface GroupedResults {
  aktualitates: SearchResult[];
  services: SearchResult[];
  preces: SearchResult[];
}

// Function to normalize Latvian text by removing diacritics
function normalizeLatvianText(text: string): string {
  const latvianMap: { [key: string]: string } = {
    ā: 'a',
    Ā: 'A',
    č: 'c',
    Č: 'C',
    ē: 'e',
    Ē: 'E',
    ģ: 'g',
    Ģ: 'G',
    ī: 'i',
    Ī: 'I',
    ķ: 'k',
    Ķ: 'K',
    ļ: 'l',
    Ļ: 'L',
    ņ: 'n',
    Ņ: 'N',
    š: 's',
    Š: 'S',
    ū: 'u',
    Ū: 'U',
    ž: 'z',
    Ž: 'Z',
  };

  return text.replace(/[āĀčČēĒģĢīĪķĶļĻņŅšŠūŪžŽ]/g, (match) => latvianMap[match] || match);
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const { searchData, loading: dataLoading } = useSearchData();

  const fuse = useMemo(() => {
    if (!searchData.length) return null;

    return new Fuse(searchData, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.2 },
        { name: 'keywords', weight: 0.3 },
      ],
      threshold: 0.2, // Lower = more strict matching
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true, // Better for partial matches
      shouldSort: true,
      // Custom function to normalize text for searching
      getFn: (obj, path) => {
        const value = Fuse.config.getFn(obj, path);
        if (typeof value === 'string') {
          return normalizeLatvianText(value.toLowerCase());
        }
        if (Array.isArray(value)) {
          return value.map((item) =>
            typeof item === 'string' ? normalizeLatvianText(item.toLowerCase()) : item
          );
        }
        return value;
      },
    });
  }, [searchData]);

  const results = useMemo(() => {
    if (!query.trim() || !fuse) return null;

    // Normalize the search query as well
    const normalizedQuery = normalizeLatvianText(query.toLowerCase());
    const fuseResults = fuse.search(normalizedQuery);

    const items = fuseResults.map((result) => ({
      ...result.item,
      score: result.score,
    }));

    // Group by category
    const grouped: GroupedResults = {
      aktualitates: [],
      services: [],
      preces: [],
    };

    items.forEach((item) => {
      grouped[item.category].push(item);
    });

    return {
      grouped,
      total: items.length,
      hasResults: items.length > 0,
    };
  }, [query, fuse]);

  return {
    query,
    setQuery,
    results,
    isSearching: query.trim().length > 0,
    loading: dataLoading,
  };
}
