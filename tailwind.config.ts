import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary_blue: "#306DDD",
        secondary_blue: "#E9F4FF",
        stormwater_flood: "0100FF",
        coastal_flood: "#3C9CD9",
        primary_area: "#E75724",
        secondary_area: "#FFF4E6",
        highlight_area: "#FFBEAF",
        black: "#000000",
        gray:"#5A5A5A",
        button: "#FFFFFF"
      },
      fontSize: {
        title: "30px",
        heading: "18px",
        body: "14px",
        label_mobile:"12px",
        label_desktop:"15px",
        buttom_text:"10px",
      }
    },
  },
  plugins: [],
}
export default config
