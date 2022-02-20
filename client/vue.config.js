const TerserPlugin = require("terser-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: isProd
        ? [
            new TerserPlugin({
              terserOptions: {
                ecma: 6,
                compress: { drop_console: true },
                output: { comments: false, beautify: false },
              },
            }),
          ]
        : [],
    },
  },
  devServer: {
    proxy: "http://localhost:3000",
  },
  outputDir: "../server/public",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
					@import "../styles/constants/_colors.scss";
					@import "../styles/constants/_typography.scss";
					@import "../styles/constants/_breakpoints.scss";

					@import "../styles/mixins/_text-style.scss";
					@import "../styles/mixins/_responsive.scss";
					@import "../styles/mixins/_positions.scss";
					@import "../styles/mixins/_flexbox.scss";

					@import "../styles/layouts/_grids.scss";

					@import "../styles/base/_normalize.scss";
					@import "../styles/base/_reset.scss";
					@import "../styles/base/_globals.scss";

					@import "../styles/modules/_tags.scss";
					@import "../styles/modules/_prices.scss";
					@import "../styles/modules/_buttons.scss";
					@import "../styles/modules/_forms.scss";
					@import "../styles/modules/_avatars.scss";
					`,
      },
    },
  },
};
