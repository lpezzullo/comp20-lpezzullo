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

app.post('/sendLocation', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	var newLogin = request.body.login;
	var newLat = request.body.lat;
	var newLng = request.body.lng;
	var toInsert = {
		"login" : newLogin,
		"lat" : newLat,
		"lng" : newLng,
		"created_at" : new Date()
	};
	console.log("toInsert = " + toInsert.login + " " + toInsert.created_at);
	db.collection('locations', function(error1, coll) {
		var id = coll.update({login:newLogin}, toInsert, {upsert:true}, function(error2, saved) {
			if (error2) {
				response.send(500);
			}
			else {
				console.log("Inserted user!");
				response.send(200);
			}
	    });
	});
});

app.get('/', function(request, response) {

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	response.set('Content-Type', 'text/html');
	var indexPage = '';
	db.collection('locations', function(er, collection) {
		collection.find().toArray(function(err, cursor) {
			if ((!err)&&(cursor.length !=0)) {
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

app.get('/location.json', function(request, response) {	

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	var findLogin = request.query.login;
	db.collection('locations', function(er, collection) {
/*		if (!er) {
			console.log("No error occurred in connecting to 'locations'");
			collection.find({login:findLogin}, function(err, cursor) {
				if(!err) {
					console.log("No error in finding findLogin = " + findLogin);
					response.send("No error in finding findLogin = " + findLogin);
				} else {
					console.log("Error in finding findLogin = " + findLogin);
					response.send("Error in finding findLogin = " + findLogin);
				}
			});
		} else {
			console.log("You're getting an error in connecting to 'locations'");
		}*/
		if (!er) {
			collection.find({login:findLogin},{limit:1}).toArray(function(err,cursor) {
				if (!err) {
					console.log("findLogin is set to " + findLogin);
					console.log("Cursor length is " + cursor.length);
					if (cursor.length != 0) {
						response.send(cursor[0]);
					} else {
						response.send("{}");
					}
				} else {
					console.log("Collection.find() threw an error.");
				}
			});
		} else {
			response.send("Sorry! Something went wrong.");
		} 
	});
});

	
	app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});