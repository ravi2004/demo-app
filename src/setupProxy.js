const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://122.160.136.221:8000',
      changeOrigin: true,
    })
  );
};