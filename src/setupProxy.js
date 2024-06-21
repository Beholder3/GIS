const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'stationsapi-production.up.railway.app',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    })
  );
};
