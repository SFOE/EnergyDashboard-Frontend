const serverlessExpress = require('@vendia/serverless-express');
const app = require('./dist/energy-dashboard-web/serverless/main');

exports.handler = serverlessExpress({ app: app.server });
