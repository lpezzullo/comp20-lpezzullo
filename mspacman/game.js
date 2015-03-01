function init() {
	var canvas = document.getElementById('game_canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		var img = new Image();
		img.addEventListener("load", function() {
  		// execute drawImage statements here
  			ctx.drawImage(img, 322, 2, 464, 136, 0, 0, 464, 136);
			ctx.drawImage(img, 83, 23, 13, 14, 35, 31, 13, 14);
		}, false);
		img.src = "pacman10-hp-sprite.png";
		
	} else {
		alert('Sorry - Ms Pac Man will not render on your browser.');
	};
};