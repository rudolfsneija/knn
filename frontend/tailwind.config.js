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
        // ===== BRAND COLORS =====
        // Primary brand colors (madder red - for main site buttons, highlights)
        primary: {
          50: '#f3cad0',
          100: '#e896a2',
          200: '#dc6173',
          300: '#cf2e46',
          400: '#9d2235',
          500: '#9d2235', // Main brand color
          600: '#7c1b2a',
          700: '#5d141f',
          800: '#3e0e15',
          900: '#1f070a',
          950: '#1f070a',
        },
        
        // Secondary colors (earth yellow - for footer, complementary elements)
        secondary: {
          50: '#fdfbf9ff',
          100: '#ecdcc3',
          200: '#e2cba4',
          300: '#d9b986',
          400: '#cfa768',
          500: '#b7945cff', // Main secondary color
          600: '#bd8c3c',
          700: '#8e692d',
          800: '#5f461e',
          900: '#2f230f',
          950: '#2f230f',
        },

        // ===== STATUS COLORS =====
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

        // ===== ADMIN THEME COLORS =====
        admin: {
          // Dark backgrounds
          'bg-primary': '#0a0a0b',     // Almost black background
          'bg-secondary': '#111113',   // Slightly lighter background
          'bg-tertiary': '#1a1a1d',    // Card/panel backgrounds
          'bg-hover': '#222225',       // Hover states
          
          // Dark surfaces (elevated elements)
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
