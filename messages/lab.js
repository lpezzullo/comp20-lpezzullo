// Create instance of XHR object
xhr = new XMLHttpRequest();
// Set up the request
xhr.open("get", "data.json", true);
// Set up handler for the response
xhr.onreadystatechange = myCallbackFunction;
// Execute the request
xhr.send();
function myCallbackFunction() {
	console.log("In my callback function " + xhr.readyState);
	if (xhr.readyState == 4 && xhr.status == 200) {
		alert("Got data back!");
		data = JSON.parse(xhr.responseText);
		/*var result = "";
		for (i = 0; i < data.length; i++) {
			result += "<p>" + data[i]['username'] + " - " + data[i]["content"] + "</p>";
		}*/
		document.getElementById("list").innerHTML = xhr.responseText;
	}
}