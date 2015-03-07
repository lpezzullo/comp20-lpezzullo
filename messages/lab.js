
xhr = new XMLHttpRequest();
xhr.open("get", "http://tuftsdev.github.io/comp20-lpezzullo/messages/data.json", true);
//xhr.open("get", "http://messagehub.herokuapp.com/messages.json", true);
xhr.onreadystatechange = parse;
xhr.send();
function parse() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		data = JSON.parse(xhr.responseText);
		var result = "";
		for (i = 0; i < data.length; i++) {
			result += "<p>" + data[i]["content"] + " - " +  data[i]['username'] + "</p>";
		}
		document.getElementById("messages").innerHTML = result;
	}
}
