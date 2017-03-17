const express = require ('express'),
  morgan = require ('morgan'),
  bodyParser = require('body-parser'),
  app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static('./client'));
  require('./routes.js')(app, express);
 
const port = process.env.PORT || 8888;
app.listen(port);
console.log('The server is now listening on port: ' + port);
