/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary brand colors (for main site - buttons, highlights)
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
        // Secondary colors (for footer, complementary elements)
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
        // Accent colors (for highlights, CTAs)
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
        // Status colors
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
        // Admin dashboard dark theme colors
        admin: {
          // Dark backgrounds
          'bg-primary': '#0a0a0b',     // Almost black background
          'bg-secondary': '#111113',   // Slightly lighter background
          'bg-tertiary': '#1a1a1d',    // Card/panel backgrounds
          'bg-hover': '#222225',       // Hover states
          
          // Dark surfaces
          'surface-100': '#2a2a2f',    // Elevated surfaces
          'surface-200': '#35353a',    // Higher elevation
          'surface-300': '#404045',    // Highest elevation
          
          // Text colors for dark theme
          'text-primary': '#ffffff',   // Primary text (white)
          'text-secondary': '#d1d5db', // Secondary text (light gray)
          'text-tertiary': '#9ca3af',  // Tertiary text (medium gray)
          'text-muted': '#6b7280',     // Muted text (darker gray)
          
          // Borders and dividers
          'border-primary': '#374151', // Main borders
          'border-secondary': '#4b5563', // Lighter borders
          'border-focus': '#3b82f6',   // Focus states
          
          // Admin accent colors (for the dark theme)
          'accent-primary': '#3b82f6', // Blue accent
          'accent-secondary': '#8b5cf6', // Purple accent
          'accent-success': '#10b981',  // Green accent
          'accent-warning': '#f59e0b',  // Orange accent
          'accent-danger': '#ef4444',   // Red accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'admin': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'admin-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
