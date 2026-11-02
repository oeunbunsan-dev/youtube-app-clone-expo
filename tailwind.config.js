/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        card: '#ffffff',
        'card-foreground': '#0a0a0a',
        popover: '#ffffff',
        'popover-foreground': '#0a0a0a',
        primary: '#171717',
        'primary-foreground': '#fafafa',
        secondary: '#f5f5f5',
        'secondary-foreground': '#171717',
        muted: '#f5f5f5',
        'muted-foreground': '#737373',
        accent: '#f5f5f5',
        'accent-foreground': '#171717',
        destructive: '#dc2626',
        'destructive-foreground': '#fafafa',
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#a3a3a3',
      },
    },
  },
  plugins: [],
};
