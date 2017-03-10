const morgan = require ('morgan');
const bodyParser = require('body-parser');


//@param app (Object) = invocation of express
//@param express (Object) = reference to express
module.exports = function (app, express){
  app.use(morgan('dev')); 
  app.use(bodyParser.urlencoded({extended: true})); // parse UTF-8 encoding
  app.use(bodyParser.json()); //parse and translat eto json
  app.use(express.static(__dirname + '../client'));
  
};