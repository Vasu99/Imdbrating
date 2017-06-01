var express = require('express');
var imdb = require('imdb-api');
var app = express();
var mname = "hello";
let movie;
var newdata;
app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/processget',function(req,res){
   // mname = req.query.mname;
    
    var val = imdb.get('The Toxic Avenger');
    //console.log(val);
    imdb.getReq({ name: 'The Toxic Avenger' }, (err, things) => {
    movie = things;
        newdata = JSON.stringify(movie);
        console.log('---------------');
        console.log(movie);
        console.log('---------------');
        console.log(movie["rating"]);
        console.log('---------------');
        console.log(movie.rating);
        console.log('---------------');
        console.log(newdata["rating"]);
        console.log('---------------');
       res.end('Response ended '+movie.rating);
    });
        console.log("Console running");
    
        
});

var server = app.listen(8089,function(){
    console.log('Server running on'+server.address().port);
});
