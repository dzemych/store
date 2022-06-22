const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
   app.use(
      '/api',
      createProxyMiddleware({
         target: "https://tandem.km.ua",
         changeOrigin: true,
      })
   );
};