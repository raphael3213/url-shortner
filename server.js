// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongodb=require('mongodb').MongoClient
var mongourl=process.env.MONGOLAB_URI;
var arr=[];

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get("/:urls", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  var url=request.params.urls;
  mongo
  
  if(url.length==4)
  {
    
  }
  else
  {
    
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
