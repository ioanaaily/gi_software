module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '375px',  // iPhone breakpoint
        'sm': '640px',  // Small tablets and large phones
        'md': '768px',  // Tablets
        'lg': '1024px', // Laptops/Desktops
        'xl': '1280px', // Large laptops and desktops
        '2xl': '1536px' // Extra large screens
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
