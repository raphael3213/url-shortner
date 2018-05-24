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
  mongodb.connect(mongourl,function(err,client)
                  {
    
    if(err) console.log(err);
    var datab=client.db("fcc1");
    var coll=datab.collection("urls");
   if(url.length==4)
   {
     coll.find({_id:url}).toArray(function(err,doc)
                                  {
       if(err) console.log(err);
       if(doc.length==0)
       {
         response.json({"message":"no entry in db"});
         client.close()
       }
       response.json({"orignal url":doc[0].name,"short url":"https://url-short12214.glitch.me/"+doc[0]._id})
       
     });
   }
    
  });
  
  
 
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
