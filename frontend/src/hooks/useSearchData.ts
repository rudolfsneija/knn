import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import type { SearchItem } from '../utils/searchData';
import { staticServicesData } from '../utils/searchData';

interface AktualitateItem {
  id: number;
  title: string;
  short_description?: string;
  content?: string;
  tags?: string;
}

interface PreceItem {
  id: number;
  name: string;
  description?: string;
  category?: string;
  tags?: string;
  available: boolean;
  price?: number;
}

export function useSearchData() {
  const [searchData, setSearchData] = useState<SearchItem[]>(staticServicesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch dynamic data from your APIs
      const [aktualitatesResponse, precesResponse] = await Promise.all([
        axios.get('/api/aktualitates').catch(() => ({ data: { success: false, data: [] } })),
        axios.get('/api/produkti').catch(() => ({ data: { success: false, data: [] } })),
      ]);

      const searchItems: SearchItem[] = [
        // Static service pages
        ...staticServicesData,

        // Dynamic aktualitātes
        ...(aktualitatesResponse.data.success && aktualitatesResponse.data.data
          ? aktualitatesResponse.data.data.map((item: AktualitateItem) => ({
              id: `akt-${item.id}`,
              title: item.title || 'Bez nosaukuma',
              description: item.short_description || item.content || 'Nav apraksta',
              category: 'aktualitates' as const,
              url: `/aktualitates/${item.id}`,
              keywords: [
                ...(item.tags ? item.tags.split(',').map((tag: string) => tag.trim()) : []),
                'aktualitātes',
                'jaunumi',
                'ziņas',
              ].filter(Boolean),
            }))
          : []),

        // Dynamic preces from database
        ...(precesResponse.data.success && precesResponse.data.data
          ? precesResponse.data.data.map((item: PreceItem) => ({
              id: `prece-${item.id}`,
              title: item.name || 'Bez nosaukuma',
              description: item.description || 'Nav apraksta',
              category: 'preces' as const,
              url: `/preces/${item.id}`,
              keywords: [
                item.category || '',
                ...(item.tags ? item.tags.split(',').map((tag: string) => tag.trim()) : []),
                item.available ? 'pieejams' : 'nav pieejams',
                item.price ? 'ar cenu' : 'bez cenas',
                'prece',
                'produkts',
                'preces',
              ].filter(Boolean),
            }))
          : []),
      ];

      setSearchData(searchItems);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch search data:', err);
      setError('Neizdevās ielādēt meklēšanas datus');
      // Keep static service data if API fails
      setSearchData(staticServicesData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSearchData();
  }, [fetchSearchData]);

  // Refresh search data every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchSearchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchSearchData]);

  return { searchData, loading, error, refreshSearchData: fetchSearchData };
}
