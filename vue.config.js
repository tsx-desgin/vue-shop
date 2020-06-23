module.exports = {
    devServer: {
      host:"localhost",
      port:9937,
      proxy:{
        '/api':{
          target:'http://api.4yue.top/index.php/',
          changeOrigin: true,
          pathRewrite:{
            '^/api':''
          }
        }
      }
    }
  }