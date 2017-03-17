
const app = require('./utils.js'),
  express = require('express');

app.createApp().listen(process.env.PORT || 8888);

require('./routes.js')(app, express);