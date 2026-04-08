/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 0 1px rgba(0,0,0,0.9), 0 0 24px rgba(0,255,255,0.35), 0 0 72px rgba(255,0,204,0.28)',
      },
      colors: {
        ink: '#090411',
        panel: '#161027',
        panel2: '#22153c',
        cyan: '#33f6ff',
        magenta: '#ff4fd8',
        yellow: '#ffe86b',
        lime: '#88ff7a',
      },
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive'],
        mono: ['"VT323"', 'monospace'],
      },
      backgroundImage: {
        'arcade-grid':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.82' },
          '52%': { opacity: '0.62' },
          '54%': { opacity: '1' },
        },
        glitchShift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '20%': { transform: 'translate3d(-2px, 1px, 0)' },
          '40%': { transform: 'translate3d(3px, -2px, 0)' },
          '60%': { transform: 'translate3d(-1px, 2px, 0)' },
          '80%': { transform: 'translate3d(2px, -1px, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        barStutter: {
          '0%, 100%': { width: '68%' },
          '24%': { width: '72%' },
          '48%': { width: '76%' },
          '72%': { width: '70%' },
          '88%': { width: '78%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0,0,0,0)' },
          '50%': { boxShadow: '0 0 28px rgba(0,255,255,0.48), 0 0 72px rgba(255,0,204,0.22)' },
        },
        scanDrift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        burst: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.2)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 4.2s infinite',
        glitch: 'glitchShift 320ms steps(2, end) infinite',
        stutter: 'barStutter 6.5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
        drift: 'scanDrift 15s linear infinite',
        popIn: 'popIn 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        burst: 'burst 780ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};
