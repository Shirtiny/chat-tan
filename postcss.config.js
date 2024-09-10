export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 100,
      propList: ["*", "!letter-spacing"],
      mediaQuery: false,
      minPixelValue: 0.01,
      replace: true,
      selectorBlackList: [],
      unitPrecision: 5,
      exclude: (path) => {
        const isExclude = [".yarn", "node_modules", "src/styles/lib.scss"].some(
          (p) => path.includes(p)
        );
        if (isExclude) {
          console.log("exclude:", path);
          return true;
        }

        return false;
      },
    },
  },
};
