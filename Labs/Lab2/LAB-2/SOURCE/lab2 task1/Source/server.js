var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = require('url');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
//var urlDB = "mongodb://samhitha:samhitha@ds115569.mlab.com:15569/samhitha";
//var urlDB='mongodb://samhitha:samhitha@ds115569.mlab.com:15569/samhitha';
var urlDB='mongodb+srv://Samhitha1193:Vijayaraja28*@samhithacluster1-x1aje.mongodb.net/test?retryWrites=true&w=majority';
var amazon = require('geo-amazon');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.all('/', function(req,res,next) {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/login/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var userStart = pathname.indexOf("u=");
    var userEnd = pathname.indexOf("&p=");
    var user = pathname.substring(userStart+2, userEnd);
    var password = pathname.substring(userEnd+3, pathname.length);

    //console.log(user);
    //console.log(password);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('samhitha');

        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('lab2').findOne({Username: user}, function(err, doc) {
            if(doc == null)
            {
                client.close();
                console.log("fail");
                res.send("fail");
            }
            assert.equal(err,null);

            if(doc != null)
            {
                if(doc.Username == user && doc.Password == password)
                {
                    client.close();
                    console.log("success");
                    res.send("success");
                }
                else
                {
                    client.close();
                    console.log("noMatch");
                    res.send("noMatch");
                }
            }
        });
    });
});

app.post('/register/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var userStart = pathname.indexOf("u=");
    var userEnd = pathname.indexOf("&p=");
    var user = pathname.substring(userStart+2, userEnd);
    var password = pathname.substring(userEnd+3, pathname.length);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    console.log(user);
    //console.log(password);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('samhitha');
        //res.setHeader('Access-Control-Allow-Origin', '*');
        //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        if(err)
        {
            alert("error");
            res.write("Failed, Error while connecting to Database");

            res.end();
        }

        db.collection('lab2').insertOne( {
            "Username" : user,
            "Password" : password
        }, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into users");
            res.send("success");
        });
    });
});

app.post('/update/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var userStart = pathname.indexOf("u=");
    var colorStart = pathname.indexOf("&c=");
    var colorEnd = pathname.indexOf("&h=");
    var heightEnd = pathname.indexOf("&w=");
    var user = pathname.substring(userStart+2, colorStart);
    var color = pathname.substring(colorStart+3, colorEnd);
    var height = pathname.substring(colorEnd+3, heightEnd);
    var weight = pathname.substring(heightEnd+3, pathname.length);
    var ama = amazon.store('US', {product: "D"});

    //console.log(user);
    //console.log(color);
    //console.log(height);
    //console.log(weight);
    //console.log(ama);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('samhitha');

        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('lab2').update( {"Username" : user}, {$set: {"Color":color, "Height":height,
                "Weight": weight, "Amazon": ama}});

        res.send("success");
    });
});

app.post('/delete/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var userStart = pathname.indexOf("u=");
    var user = pathname.substring(userStart+2, pathname.length);

    //console.log(user);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('samhitha');

        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('lab2').update( {"Username" : user}, {$unset: {"Color":"", "Height":"",
                "Weight": "", "Amazon": ""}});

        res.send("success");
    });
});

app.post('/get/*', function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var userStart = pathname.indexOf("u=");
    var user = pathname.substring(userStart+2, pathname.length);

    MongoClient.connect(urlDB, function(err, client) {
        var db = client.db('samhitha');

        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('lab2').findOne({Username: user}, function (err, doc) {
            if (doc == null) {
                client.close();
                console.log("fail");
                res.send("fail");
            }
            assert.equal(err, null);

            if (doc != null) {
                res.send(doc);
            }
        });
    });
});

app.listen(port, function() {
    console.log('app running')
});
console.log('Client Server running at http://127.0.0.1:8080/');


/*
var server = app.listen(8087, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});


 */