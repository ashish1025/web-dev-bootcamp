const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req,res)
{
    var crypto=req.body.crypto;
    var currency=req.body.curr;
    var baseurl="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalurl = baseurl + crypto + currency;
    request(finalurl , function(error,response, body) {
        var data=JSON.parse(body);
        var price=data.last;
        res.send("<h1> The current price of " + crypto + " is " + price +" "+ currency +"</h1>");
    });

});

app.listen(3000,function(req,res){
    console.log("server started on port 3000");

});
