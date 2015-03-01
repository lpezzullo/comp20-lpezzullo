function draw() {
	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.addEventListener("load",function() {
		// drawImage statements
	}, false);
	img.src = "pacman10-hp-sprite.png";

}