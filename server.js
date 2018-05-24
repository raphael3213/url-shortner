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
app.get("/", function (request, response) {
response.sendFile(__dirname + '/views/index.html');})

app.get("/conv/(*)", function (request, response) {
  
  let url = request.originalUrl.replace(/^\/new\//, "");
  
    console.log("original: " + request.originalUrl);
   
  url=url.substr(6,url.length-1)
   console.log("original: " + url);
  //var url=request.params.urls;
  mongodb.connect(mongourl,function(err,client)
                  {
    
    if(err) console.log(err);
    var datab=client.db("fcc1");
    var coll=datab.collection("urls");
  
    
      coll.find({name:url}).toArray(function(err,doc)
                                  {
       if(err) console.log(err);
       if(doc.length==0)
       {
         var hash;
         
          for (var i = 0; i < url.length; i++) {
          var chr   = url.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
            hash |= 0; 
          }
         coll.insert({_id:hash,name:url},function(err,data)
                      {
                        if(err) console.log(err);
                      })
         response.json({"orignal url":url,"short url":"https://url-short12214.glitch.me/check/"+hash})
         client.close()
       }
        else
       response.json({"orignal url":doc[0].name,"short url":"https://url-short12214.glitch.me/check/"+doc[0]._id})
       client.close()
     });
    
    
  });
  
  
 
});

app.get('/check/:urls',function(request,response){
  
   var url=request.params.urls;
  
  mongodb.connect(mongourl,function(err,client)
                  {
    if(err) console.log(err);
    var datab=client.db("fcc1");
    var coll=datab.collection("urls");
  
     coll.find({_id:parseInt(url)}).toArray(function(err,doc)
                                  {
       if(err) console.log(err);
       if(doc.length==0)
       {
         response.json({"message":"no entry in db"});
         client.close()
       }
       else
       {//response.json({"orignal url":doc[0].name,"short url":"https://url-short12214.glitch.me/"+doc[0]._id})
        response.redirect(doc[0].name);
       client.close()}
     });
   
  })
    
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
