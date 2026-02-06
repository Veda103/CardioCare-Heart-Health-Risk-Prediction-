/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary Brand Color - Deep, calming teal
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#008080', // Main brand color
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Secondary Accent - Soft, warm coral
        accent: {
          50: '#fff8f5',
          100: '#ffede5',
          200: '#fed7cc',
          300: '#fdba9d',
          400: '#fba07a',
          500: '#FFA07A', // Main accent color
          600: '#f97847',
          700: '#ea5a28',
          800: '#cc4a1e',
          900: '#a73f1c',
        },
        // Neutral backgrounds and text
        neutral: {
          50: '#F7FAFC', // Main page background
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0ADB8',
          500: '#718096',
          600: '#4A5568', // Body text
          700: '#2D3748', // Heading text
          800: '#1A202C',
          900: '#171923',
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
