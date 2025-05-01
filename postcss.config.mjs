const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      keyframes: {
        loaderFade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        loader: 'loaderFade 675ms ease-in-out infinite alternate',
      },
    },
  },
};

export default config;
