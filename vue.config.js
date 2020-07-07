module.exports = {
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