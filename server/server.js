const app = require('./utils.js');
const port = process.env.PORT || 8888;

app.createApp().listen(port);

console.log('The server is now listening on port: ' + port);
