// Color palette and theme configuration for the KNN application

export const colors = {
  // Main Site Theme (Light)
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',    // Neutral light gray
      tertiary: '#f3f4f6',     // Slightly darker neutral
    },
    text: {
      primary: '#111827',      // Dark gray for primary text
      secondary: '#374151',    // Medium gray for secondary text
      tertiary: '#6b7280',     // Light gray for tertiary text
      muted: '#9ca3af',        // Very light gray for muted text
    },
    border: {
      primary: '#e5e7eb',      // Light neutral border
      secondary: '#d1d5db',    // Medium neutral border
      focus: '#9d2235',        // Your dark red brand color for focus
    },
  },

  // Admin Dashboard Theme (Dark)
  admin: {
    background: {
      primary: '#0a0a0b',      // Almost black
      secondary: '#111113',     // Slightly lighter
      tertiary: '#1a1a1d',     // Card backgrounds
      hover: '#222225',         // Hover states
    },
    surface: {
      100: '#2a2a2f',          // Elevated surfaces
      200: '#35353a',          // Higher elevation
      300: '#404045',          // Highest elevation
    },
    text: {
      primary: '#ffffff',      // Main text
      secondary: '#d1d5db',    // Secondary text
      tertiary: '#9ca3af',     // Tertiary text
      muted: '#6b7280',        // Muted text
    },
    border: {
      primary: '#374151',      // Main borders
      secondary: '#4b5563',    // Lighter borders
      focus: '#3b82f6',        // Focus states
    },
    accent: {
      primary: '#3b82f6',      // Blue
      secondary: '#8b5cf6',    // Purple
      success: '#10b981',      // Green
      warning: '#f59e0b',      // Orange
      danger: '#ef4444',       // Red
    },
  },

  // Brand Colors (Used across themes)
  brand: {
    primary: {
      50: '#fef2f3',
      100: '#fde6e8',
      200: '#fbd0d5',
      300: '#f7aab2',
      400: '#f27a88',
      500: '#ea5a6b',
      600: '#d63851',
      700: '#b42a41',
      800: '#9d2235',
      900: '#8a1e30',
      950: '#4c0d17',
    },
    secondary: {
      50: '#fdfcf9',
      100: '#fbf8f1',
      200: '#f6efe1',
      300: '#efe2ca',
      400: '#e6d1aa',
      500: '#dbbf88',
      600: '#cfa768',
      700: '#b8934f',
      800: '#967643',
      900: '#7a6139',
      950: '#41331c',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
  },

  // Status Colors (Used across all themes)
  status: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
  },
} as const;

// Helper functions for theme-based styling
export const getThemeColors = (theme: 'light' | 'admin') => {
  return theme === 'admin' ? colors.admin : colors.light;
};

// Tailwind class helpers for different themes
export const themeClasses = {
  // Admin theme classes
  admin: {
    background: {
      primary: 'bg-admin-bg-primary',
      secondary: 'bg-admin-bg-secondary',
      tertiary: 'bg-admin-bg-tertiary',
      hover: 'bg-admin-bg-hover',
    },
    text: {
      primary: 'text-admin-text-primary',
      secondary: 'text-admin-text-secondary',
      tertiary: 'text-admin-text-tertiary',
      muted: 'text-admin-text-muted',
    },
    border: {
      primary: 'border-admin-border-primary',
      secondary: 'border-admin-border-secondary',
      focus: 'border-admin-border-focus',
    },
    button: {
      primary: 'admin-button-primary',
      secondary: 'admin-button-secondary',
      danger: 'admin-button-danger',
    },
    input: 'admin-input',
    card: 'admin-card',
  },

  // Main site theme classes
  site: {
    background: {
      primary: 'bg-white',
      secondary: 'bg-secondary-50',  // Light golden background
      tertiary: 'bg-secondary-100',  // Slightly darker golden
    },
    text: {
      primary: 'text-gray-900',      // Dark text for readability
      secondary: 'text-gray-700',    // Secondary text
      tertiary: 'text-gray-600',     // Tertiary text
      muted: 'text-gray-400',        // Muted text
    },
    border: {
      primary: 'border-gray-200',    // Light borders
      secondary: 'border-gray-300',  // Slightly darker borders
      focus: 'border-primary-800',   // Dark red focus (your brand color)
    },
    button: {
      primary: 'site-button-primary',    // Will use dark red
      secondary: 'site-button-secondary', // Will use golden
    },
    card: 'site-card',
  },
} as const;

export default colors;
