const express = require ('express'),
  port = process.env.PORT || 8888,
  morgan = require ('morgan'),
  bodyParser = require('body-parser');
  
  app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static('./client'));


  
  require('./routes.js')(app, express);

app.listen(port);
console.log('The server is now listening on port: ' + port);
