/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Praneeth30:ABCabc012@praneethweb-zv92g.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    dbase.createCollection("newCollection", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
