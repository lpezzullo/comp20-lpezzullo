function init() {
	var canvas = document.getElementById('game_canvas');
	console.log('Got the canvas!');
	if(canvas.getContext) {
		console.log('We have context!');
		ctx = canvas.getContext('2d');
		console.log('Got the 2d context!');
		var img = new Image();
		console.log('Created Image object');
		img.src = "pacman10-hp-sprite.png";
		console.log('Sourced the image');
		ctx.drawImage(img, 332, 2, 464, 136, 0, 0, 464, 136);
		console.log('Executed drawImage on board');
		ctx.drawImage(img, 83, 23, 13, 14, 35, 31, 13, 14);
		console.log('Executed drawImage on Ms Pac Man');
	}
	else {
		alert('Sorry - Ms Pac Man will not render on your browser.');
	}
}