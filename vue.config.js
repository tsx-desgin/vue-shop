module.exports = {
    devServer: {
      host:"localhost",
      port:9937,
      proxy:{
        '/api':{
          target:'http://api.2yue.cc/index.php/',
          changeOrigin: true,
          pathRewrite:{
            '^/api':''
          }
        }
      }
    }
  }