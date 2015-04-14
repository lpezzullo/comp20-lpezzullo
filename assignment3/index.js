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

var heresWhatsUp = "empty";

app.get('/', function(request, response) {
  response.send("It's working!");
});

app.post('/whatup', function(request,response) {
	heresWhatsUp = request.body.message;
	response.send("thats cool");
});

app.get('/whatup', function(request,response) {
	response.set('Content-Type', 'text/html');
	var indexPage = "";
	indexPage += "<!DOCTYPE HTML><html><head><title>what up</title></head><body><h1>whats up friendo</h1><p>";
	indexPage += heresWhatsUp;
	indexPage += "</p></body></html>"
	response.send(indexPage);
});
	
	app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});