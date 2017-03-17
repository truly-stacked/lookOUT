
const app = require('./utils.js'),
  keys = require('../config/keys.js'),
  port = process.env.PORT||8888;

app.createApp().listen(port);
console.log('Server is now listening to port ' + port);