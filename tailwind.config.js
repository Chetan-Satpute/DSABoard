module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
