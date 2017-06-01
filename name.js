var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var port = 8080;
var fs = require('fs');
var a;
var at;
var url = "http://www.imdb.com/find?ref_=nv_sr_fn&q=bahub&s=tt";
var jsondata = {name : "name"};


//Scrape values from imdb website "only titles"
request(url,function(error,response,html){
	if(!error){
		var $ = cheerio.load(html);
      //  b=$('h3.findSectionHeader').first().find('a').attr('name','tt').parent().parent();
        b=$('table.findList')

       // console.log(b);
        console.log('____________');
        b.find('a').each(function(i,element){
            a = $(this);
            at = a.text();
            data = {name: at};
            jsondata.push(data);
            console.log(at);
        });
        b1=b.text()
        //console.log(b1);        
        
       /* $('div.findSection').find('a').each(function(i,element){
			 a = $(this);
			 at = a.text();
            console.log(at);
			fs.appendFile('artistsname.txt', at,  function(err) {
   if (err) {
      return console.error(err);
   }
 });
			console.log(at);
		})*/
	}
});