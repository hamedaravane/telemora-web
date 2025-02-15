import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        fontSize: {
          tiny: '1rem',
          small: '1rem',
          medium: '1rem',
          large: '1rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1rem',
          medium: '1rem',
          large: '1rem',
        },
        radius: {
          small: '1rem',
          medium: '1rem',
          large: '1rem',
        },
        dividerWeight: '',
      },
      prefix: 'tg',
      addCommonColors: true,
      themes: {
        telegram: {
          extend: 'dark',
          layout: {},
          colors: {
            background: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            foreground: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            divider: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            overlay: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            focus: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            content1: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            content2: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            content3: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            content4: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            default: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            primary: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            secondary: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            success: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            warning: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
            danger: {
              foreground: '#666666',
              DEFAULT: '#333333',
            },
          },
        },
      },
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
    }),
  ],
} satisfies Config;
