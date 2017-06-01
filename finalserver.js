var express = require('express');
var imdb = require('imdb-api');
var bodyParser = require('body-parser');
var app = express();
var mname = "hello";
let movie;
var newdata;
var request = require('request');
var cheerio = require('cheerio');
var port = 8089;
var fs = require('fs');
var count = 1;
var url = "http://www.imdb.com/find?ref_=nv_sr_fn&q=";
var urlencoded = bodyParser.urlencoded({extended:false});
app.set('view engine', 'ejs');
app.use(express.static('public'));

//render the main page
app.get('/',function(req,res){
    res.render('main');
});

//Get list of movie names
app.get('/processget/:mname',function(req,res){
    console.log("RM");
    var count = 1;
    mname = req.params.mname;
var url = "http://www.imdb.com/find?ref_=nv_sr_fn&q="+mname+"&s=tt";
debugger;
    //webscrape result
    request(url,function(error,response,html){
	if(!error){
        var jsondata =[];
		var $ = cheerio.load(html);
        b=$('.findList')
        console.log('------------');
        b.find('a').each(function(i,element){
            if(i>30)
                return false;
            a = $(this);
            var linkval = $(this).attr('href');
            at = a.text();
            data = {name: at,link:linkval};
              if(at!="")
                  {
            jsondata.push(data);
                  }
            
            count++;
            console.log(at+"  link  "+linkval);
        });
        
       jsdata = JSON.stringify(jsondata);
        res.send(jsdata);
	}
        else{
            res.send("error");
        }
  });
});


//Get the rating of the movie
app.get('/getrating/:linkvalue/:linkno',function(req,res){
    value = req.params.linkvalue;
    valueno = req.params.linkno;

    url = "http://www.imdb.com/title/"+value+"/?ref_=fn_tt_tt_"+valueno;
request(url,function(error,response,html){
	if(!error){
        var jsondata =[];
		var $ = cheerio.load(html);
        a = $('div.ratingValue').find('span');
        at = a.text();
        p = $('div.poster').find('img').attr('src');
        console.log("Rating "+at);
        data = {rating:at,poster:p};
        jsdata = JSON.stringify(data);
        res.send(jsdata);
       }
  });
});

//Run Servero port 8089
var server = app.listen(8089,function(){
    console.log('Server running on'+server.address().port);
});
