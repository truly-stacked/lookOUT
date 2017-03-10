var express = require('express');
var morgan = require ('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(express.static('../client'));

app.listen(8888);

