module.exports = {
  devServer: {
    https: false,
    proxy: {
      "/v1": {
        changeOrigin: true,
        target: "http://127.0.0.1:8100"
      },
      "/group1": {
        changeOrigin: true,
        target: "http://localhost:8100/images"
      }
    }
  }
}