var express = require('express');
var app = express();
var path = require('path');
const port = process.env.PORT || 3000;


app.use('/', express.static(path.join(__dirname + '/public')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// // add other routes below
// app.get('/about', function (req, res) {
//   res.sendFile(path.join(__dirname + 'views/about.html'));
// });

app.listen(port, function(err) {
    if (err) {
        console.log("Error while starting the server..."); 
    } else {
        console.log("Server is running...");
    }
});