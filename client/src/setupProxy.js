const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
   app.use(
      '/api',
      createProxyMiddleware({
         target: process.env.NODE_ENV === 'production' ?
            "https://tandem.km.ua:443"
            : "http://localhost:443",
         changeOrigin: true,
      })
   );
};