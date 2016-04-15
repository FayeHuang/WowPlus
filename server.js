var path = require('path');
var express = require('express');
var httpProxy = require('http-proxy');
var app = express();
var apiProxy = httpProxy.createProxyServer();
var apiServer = process.env.API_SERVER || 'http://127.0.0.1:8888'


// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.use('/', express.static( path.join(__dirname, 'assets/build') ) );

app.get('/api/*', function(req, res){ 
  apiProxy.web(req, res, { target: apiServer });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});