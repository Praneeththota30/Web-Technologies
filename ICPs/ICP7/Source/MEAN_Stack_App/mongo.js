/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb+srv://Samhitha1193:Vijayaraja28*@samhithacluster1-x1aje.mongodb.net/test?retryWrites=true';
var ObjectID = require('mongodb').ObjectID;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var dbname = db.db('student');
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(dbname, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var dbname = db.db('student');
        dbname.collection('books').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});


app.get('/delete/:id', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        mongo = require('mongodb');
        var dbase = db.db('student');
        var id = req.params.id;

        dbase.collection('books').deleteOne({ _id: new mongo.ObjectId(id) }, function(err, obj) {
            if (err) throw err;
            console.log( " document(s) deleted");

        });


    });
});


app.get('/update/:toBeUpdated_id', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //mongo = require('mongodb');
        var dbase = db.db('student');


        var myquery = { _id:ObjectID(req.params.toBeUpdated_id) };
        var newvalues = {$set: req.body };

        dbase.collection('books').updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " record(s) updated");
            db.close();
        });
    });
});

var insertDocument = function(db, data, callback) {


    db.collection('books').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var server = app.listen(8087, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});