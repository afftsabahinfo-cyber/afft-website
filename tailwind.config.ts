import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        afft: {
          ink: '#1F1B16',
          brown: '#734C24',
          clay: '#A7652A',
          orange: '#F28C28',
          sand: '#F5E7D0',
          cream: '#FFF7EA',
          moss: '#4A5B35',
          forest: '#223322',
          sky: '#8DB7C8',
        },
      },
      fontFamily: {
        sans: ['var(--font-urbanist)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 60px rgba(31, 27, 22, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
