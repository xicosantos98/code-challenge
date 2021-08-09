/* eslint-disable global-require */
const path = require('path');

const { ROUTES } = require('./config.routes');

module.exports = (router, app) => {
  ROUTES.forEach((route) => {
    app.use(route.apiPath, require(path.join(__dirname, route.filePath)));
  });

  return router;
};
