import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            'dark-blue': '#1A4A6C',
            'primary-blue': '#EDFCF8',
            'secondary-blue': '#DAF4F4',
            card: '#B9E2EE',
            background: '#FDFDFE',
            'bold-blue': '#6EC0F3',
            'bolder-blue': '#17A6FF',
            'primary-border': '#9D9D9D',
            
          },
    },
  },
  plugins: [],
}

export default config
