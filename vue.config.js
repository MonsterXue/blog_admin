const path = require("path");
module.exports = {
  publicPath: "./",
  configureWebpack: function (config) {
    // console.log(config.module.rules[2])
    return {
      resolve: {
        // extensions: ['.js', '.json'],
        alias: {
          "@": path.resolve(__dirname, "./src")
        }
      }
    };
  },
  devServer: {
    https: false,
    proxy: {
      "/v1": {
        changeOrigin: true,
        target: "http://47.97.216.43:8100"
      },
      "/group1": {
        changeOrigin: true,
        target: "http://localhost:8100/images"
      }
    }
  }
}