var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var heresWhatsUp = "";

app.get('/', function(request, response) {
  response.send("It's working!");
});

app.post('/whatup', function(request,response) {
	heresWhatsUp = request.body.message;
});

app.get('/whatup', function(request,response) {
	var indexPage = "";
	indexPage += "<!DOCTYPE HTML><html><head><title>what up</title></head><body><h1>whats up friendo</h1><p>";
	indexPage += heresWhatsUp;
	indexPage += "</p></body></html>"
	response.send(indexPage);
});
	
	app.listen(app.get('port'), function() {
	"  console.log("Node app is running at localhost:" + app.get('port'));
});