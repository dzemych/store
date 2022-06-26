const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
   app.use(
      '/api',
      createProxyMiddleware({
         target: "http://tandem:80",
         changeOrigin: true,
      })
   );
};