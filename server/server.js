const app = require('./utils.js');
const keys = require('../config/keys.js');
const port = process.env.port||8888;

app.createApp().listen(port);
console.log('Server is now listening to port ' + port);



