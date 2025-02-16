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
      fontSize: {
        tiny: '0.65rem',
        small: '0.75rem',
        medium: '1rem',
        large: '1.125rem',
      },
      colors: {
        background: 'var(--tg-theme-bg-color)',
        foreground: 'var(--tg-theme-text-color)',
        primary: 'var(--tg-theme-button-color)',
        'primary-text': 'var(--tg-theme-button-text-color)',
        secondary: 'var(--tg-theme-secondary-bg-color)',
        header: 'var(--tg-theme-header-bg-color)',
        accent: 'var(--tg-theme-accent-text-color)',
        link: 'var(--tg-theme-link-color)',
        hint: 'var(--tg-theme-hint-color)',
        subtitle: 'var(--tg-theme-subtitle-text-color)',
        destructive: 'var(--tg-theme-destructive-text-color)',
        section: {
          bg: 'var(--tg-theme-section-bg-color)',
          header: 'var(--tg-theme-section-header-text-color)',
          separator: 'var(--tg-theme-section-separator-color)',
        },
        bottomBar: 'var(--tg-theme-bottom-bar-bg-color)',
      },
      textColor: {
        DEFAULT: 'var(--tg-theme-text-color)',
        primary: 'var(--tg-theme-button-text-color)',
        hint: 'var(--tg-theme-hint-color)',
        subtitle: 'var(--tg-theme-subtitle-text-color)',
        destructive: 'var(--tg-theme-destructive-text-color)',
      },
      backgroundColor: {
        DEFAULT: 'var(--tg-theme-bg-color)',
        primary: 'var(--tg-theme-button-color)',
        secondary: 'var(--tg-theme-secondary-bg-color)',
        header: 'var(--tg-theme-header-bg-color)',
        section: 'var(--tg-theme-section-bg-color)',
        bottomBar: 'var(--tg-theme-bottom-bar-bg-color)',
      },
      borderColor: {
        section: 'var(--tg-theme-section-separator-color)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '1rem',
          large: '1.125rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1.25rem',
          medium: '1.5rem',
          large: '1.625rem',
        },
        radius: {
          small: '0.2rem',
          medium: '0.4rem',
          large: '0.75rem',
        },
        dividerWeight: '0.75px',
      },
      prefix: 'tg',
      addCommonColors: true,
      themes: {
        telegram: {
          extend: 'dark',
          layout: {},
          colors: {
            background: {
              foreground: 'var(--tg-theme-bg-color)',
              DEFAULT: 'var(--tg-theme-bg-color)',
            },
            foreground: {
              foreground: 'var(--tg-theme-text-color)',
              DEFAULT: 'var(--tg-theme-text-color)',
            },
            divider: {
              foreground: 'var(--tg-theme-section-separator-color)',
              DEFAULT: 'var(--tg-theme-section-separator-color)',
            },
            overlay: {
              foreground: 'var(--tg-theme-secondary-bg-color)',
              DEFAULT: 'var(--tg-theme-secondary-bg-color)',
            },
            focus: {
              foreground: 'var(--tg-theme-link-color)',
              DEFAULT: 'var(--tg-theme-link-color)',
            },
            content1: {
              foreground: 'var(--tg-theme-accent-text-color)',
              DEFAULT: 'var(--tg-theme-accent-text-color)',
            },
            content2: {
              foreground: 'var(--tg-theme-subtitle-text-color)',
              DEFAULT: 'var(--tg-theme-subtitle-text-color)',
            },
            content3: {
              foreground: 'var(--tg-theme-hint-color)',
              DEFAULT: 'var(--tg-theme-hint-color)',
            },
            content4: {
              foreground: 'var(--tg-theme-destructive-text-color)',
              DEFAULT: 'var(--tg-theme-destructive-text-color)',
            },
            default: {
              foreground: 'var(--tg-theme-text-color)',
              DEFAULT: 'var(--tg-theme-text-color)',
            },
            primary: {
              foreground: 'var(--tg-theme-button-text-color)',
              DEFAULT: 'var(--tg-theme-button-color)',
            },
            secondary: {
              foreground: 'var(--tg-theme-section-header-text-color)',
              DEFAULT: 'var(--tg-theme-section-bg-color)',
            },
            success: {
              foreground: 'var(--tg-theme-button-text-color)',
              DEFAULT: 'var(--tg-theme-button-color)',
            },
            warning: {
              foreground: 'var(--tg-theme-subtitle-text-color)',
              DEFAULT: 'var(--tg-theme-subtitle-text-color)',
            },
            danger: {
              foreground: 'var(--tg-theme-destructive-text-color)',
              DEFAULT: 'var(--tg-theme-destructive-text-color)',
            },
          },
        },
      },
      defaultTheme: 'dark',
      defaultExtendTheme: 'dark',
    }),
  ],
} satisfies Config;
