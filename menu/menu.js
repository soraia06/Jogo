
var game = new Game();

function init() {
	if(game.init())
		game.start();
}


 
var imageRepository = new function() {
	// Define images
	this.empty = null;
	this.background = new Image();

	
	this.background.onload = function() {
		imageLoaded();
	}
			
	// Set images src
	this.background.src = "imgs/bg.png";

}
  
function Drawable() {	
	this.init = function(x, y) {
		// Defualt variables
		this.x = x;
		this.y = y;
	}

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	
	// Define abstract function to be implemented in child objects
	this.draw = function() {
	};
}


// Creates the Background object which will become a child of the Drawable object. The background is drawn on the "background"canvas and creates the illusion of moving by panning the image.

function Background() {
	this.speed = 0.5; // Redefine speed of the background for panning
	
	// Implement abstract function
	this.draw = function() {
		// Pan background
		this.y += this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);
		
		// Draw another image at the top edge of the first image
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

		// If the image scrolled off the screen, reset
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();


/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
	this.init = function() {
		// Get the canvas element
		this.bgCanvas = document.getElementById('background');
		
		// Test to see if canvas is supported
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
		
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			
			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			return true;
		} else {
			return false;
		}
	};
	
	// Start the animation loop
	this.start = function() {
		animate();
	};
}


function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}


window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();