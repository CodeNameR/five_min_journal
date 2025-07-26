/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFCFA',
          100: '#FAF8F3',
          200: '#F5F2ED',
          300: '#EAE6DE',
          400: '#DDD7CB',
          500: '#C9C0B1',
          600: '#A69888',
          700: '#8B7355',
          800: '#6B5D4F',
          900: '#4A423A',
        },
        ink: {
          primary: '#2C2825',
          secondary: '#6B645F',
          muted: '#A69888',
        }
      },
      fontFamily: {
        'serif': ['Crimson Text', 'Lora', 'Georgia', 'serif'],
        'handwriting': ['Kalam', 'Caveat', 'cursive'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'paper-lifted': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
        'paper-stack': `
          0 1px 1px rgba(0,0,0,0.15),
          0 10px 0 -5px #FAF8F3,
          0 10px 1px -4px rgba(0,0,0,0.15),
          0 20px 0 -10px #FAF8F3,
          0 20px 1px -9px rgba(0,0,0,0.15)
        `,
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'paper-flip': 'paperFlip 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        paperFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      backgroundImage: {
        'paper-texture': `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(229, 225, 218, 0.1) 2px,
            rgba(229, 225, 218, 0.1) 4px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(229, 225, 218, 0.1) 2px,
            rgba(229, 225, 218, 0.1) 4px
          )
        `,
        'ruled-lines': `
          linear-gradient(
            transparent 95%,
            rgba(139, 115, 85, 0.1) 95%,
            rgba(139, 115, 85, 0.1) 100%
          )
        `,
      },
      backgroundSize: {
        'ruled': '100% 2rem',
      },
    },
  },
  plugins: [],
}