/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'
import * as colors from './src/styles/colors'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      fontSize: {
        header: ['32px', '40px'],
        xsm: '13px',
        xxs: '11px',
      },
      borderWidth: {
        '1': '1px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        inherit: 'inherit',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      opacity: {
        '3': '0.03',
        '4': '0.04',
        '32': '0.32',
        '56': '0.56',
        '64': '0.64',
        '72': '0.72',
        '88': '0.88',
      },
      colors: {
        ...colors,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      animation: {
        loader: 'loader 0.6s infinite alternate',
      },
      zIndex: {
        max: '100',
      },
      keyframes: {
        loader: {
          to: {
            opacity: '0.1',
            transform: 'translate3d(0, -1rem, 0)',
          },
        },
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('tailwindcss-animate'),
    require('tailwind-typewriter')({
      wordsets: {
        welcome: {
          words: ['Manage Your SMS Seamlessly', 'Track Your Messages', 'Test Seamlessly With Dummy SMS'],
          delay: 3,
        },
      },
    }),
  ],
}

export default config
