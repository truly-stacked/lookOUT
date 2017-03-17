
const app = require('./utils.js'),
const express = require('express');

app.createApp().listen(process.env.PORT || 8888);

require('./routes.js')(app, express);