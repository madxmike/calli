/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'dotted-pattern': "url('/dotted-pattern.png')"
      }
    },
  },
  plugins: [],
}

