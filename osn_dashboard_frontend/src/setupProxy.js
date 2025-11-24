const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Optional local proxy during development:
 * If REACT_APP_API_BASE is not set but backend runs on localhost:3001,
 * proxy /files to 3001 to avoid CORS.
 */
module.exports = function (app) {
  const target = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
  if (!target) {
    app.use(
      '/files',
      createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
      })
    );
  }
};
