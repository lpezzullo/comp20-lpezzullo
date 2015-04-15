var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
var app = express();
// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/loctest';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

/*	
app.get('/', function(request, response) {
  response.send("It's working!");
});

app.post('/sendLocation', function(request, response) {
	var noodle = request.body.noodle;
	var toInsert = {
		"noodle": noodle,
	};
	console.log("toInsert = " + toInsert.noodle);
	db.collection('pasta', function(error1, coll) {
		var id = coll.toInsertt(toInsert, function(error2, saved) {
			if (error2) {
				response.send(500);
			}
			else {
				console.log("Jake, it's okay...");
				response.send(200);
			}
	    });
	});
});

*/
app.get('/', function(request, response) {
	// User types in: /location.json?login=<LOGIN>
	// To access login sent by user: req.query.login
	response.set('Content-Type', 'text/html');
	var indexPage = '';
	db.collection('locations', function(er, collection) {
		collection.find().toArray(function(err, cursor) {
			if (!err) {
				indexPage += "<!DOCTYPE HTML><html><head><title>Marauder Locations</title></head><body><h1>where is everbody?</h1>";
				for (var count = 0; count < cursor.length; count++) {
					indexPage += "<p>" + cursor[count].login + " last logged in from " + cursor[count].lat + ", " + cursor[count].lng + " on " + cursor[count].created_at + "</p>";
				}
				indexPage += "</body></html>"
				response.send(indexPage);
			} else {
				response.send('<!DOCTYPE HTML><html><head><title>Marauder Locations</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
			}
		});
	});
});

	
	app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});