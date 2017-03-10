const express = require('express');

const app = express();

//middleware to configure application
require ('/middleware.js')(app, express);

app.listen(8888);

module.export = app;