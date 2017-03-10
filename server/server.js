const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./client'));

app.listen(8888);
