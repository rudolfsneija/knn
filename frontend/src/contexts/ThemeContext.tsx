import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'admin';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isAdminTheme: boolean;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in admin route to auto-set admin theme
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        return 'admin';
      }
      
      // Check localStorage for saved theme
      const saved = localStorage.getItem('theme') as Theme;
      return saved || defaultTheme;
    }
    return defaultTheme;
  });

  const isAdminTheme = theme === 'admin';
  const isDarkTheme = theme === 'dark' || theme === 'admin';

  const toggleTheme = () => {
    if (isAdminTheme) {
      // Admin theme stays admin, don't toggle
      return;
    }
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark', 'admin-theme');
    
    // Add current theme class
    if (theme === 'admin') {
      root.classList.add('admin-theme');
      document.body.style.backgroundColor = '#0a0a0b';
    } else if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
    } else {
      root.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
    }
    
    // Save theme to localStorage (except admin theme which is route-based)
    if (theme !== 'admin') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Auto-detect admin routes and set admin theme
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin') && theme !== 'admin') {
        setTheme('admin');
      } else if (!path.startsWith('/admin') && theme === 'admin') {
        // When leaving admin, restore previous theme
        const savedTheme = localStorage.getItem('theme') as Theme;
        setTheme(savedTheme || 'light');
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleLocationChange);
    
    // Check initial route
    handleLocationChange();
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    isAdminTheme,
    isDarkTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
