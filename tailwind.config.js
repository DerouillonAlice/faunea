/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {

      fontFamily: {
        dynapuff: ['DynaPuff', 'system-ui'], 
      },

      colors: {
        mint: '#6BCB77', // Vert menthe
        sky: '#6BAEDC',  // Bleu ciel
        peach: '#FFA559', // Pêche
        coral: '#F47C7C', // Corail
        white2: '#fff4e1' // Orange Clair

      },
    },
  },
  plugins: [],
}

