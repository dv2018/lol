var rl;

window.onload = function() {  
	rl = new Raphael(document.getElementById('main_field'), 500, 500);  
	initApp();
} 

var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mousePos = {
        x: 400,
        y: 300
    },

    // create canvas
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    rockets = [],
    MAX_PARTICLES = 400,
    colorCode = 0;

// init
/*
$(document).ready(function() {
    document.body.appendChild(canvas);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    setInterval(launch, 800);
    setInterval(loop, 1000 / 50);
});

// update mouse position
$(document).mousemove(function(e) {
    e.preventDefault();
    mousePos = {
        x: e.clientX,
        y: e.clientY
    };
});

// launch more rockets!!!
$(document).mousedown(function(e) {
    for (var i = 0; i < 5; i++) {
        launchFrom(Math.random() * SCREEN_WIDTH * 2 / 3 + SCREEN_WIDTH / 6);
    }
});*/

/*
function launch() {
    launchFrom(mousePos.x);
}

function launchFrom(x) {
    if (rockets.length < 10) {
        var rocket = new Rocket(x);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 6 - 3;
        rocket.size = 8;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rockets.push(rocket);
    }
}*/

function loop() {
    // update screen size
    if (SCREEN_WIDTH != window.innerWidth) {
        canvas.width = SCREEN_WIDTH = window.innerWidth;
    }
    if (SCREEN_HEIGHT != window.innerHeight) {
        canvas.height = SCREEN_HEIGHT = window.innerHeight;
    }

    // clear canvas
    
	context.fillStyle = "rgba(255, 255, 255, 0.05)"; // , 0.05)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	//return;
	/*
    var existingRockets = [];

    for (var i = 0; i < rockets.length; i++) {
        // update and render
        rockets[i].update();
        rockets[i].render(context);

        // calculate distance with Pythagoras
        var distance = Math.sqrt(Math.pow(mousePos.x - rockets[i].pos.x, 2) + Math.pow(mousePos.y - rockets[i].pos.y, 2));

        // random chance of 1% if rockets is above the middle
        var randomChance = rockets[i].pos.y < (SCREEN_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false; */

/* Explosion rules
             - 80% of screen
            - going down
            - close to the mouse
            - 1% chance of random explosion
        */
		/*
        if (rockets[i].pos.y < SCREEN_HEIGHT / 5 || rockets[i].vel.y >= 0 || distance < 50 || randomChance) {
            rockets[i].explode();
        } else {
            existingRockets.push(rockets[i]);
        }
    }

    rockets = existingRockets; */

    var existingParticles = [];

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();

        // render and save particles that can be rendered
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }

    // update array with existing particles - old particles should be garbage collected
    particles = existingParticles;

    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
	/*
	for( i = 0; i < 10; i++) {
		particles.shift();
	}*/
}

function Particle(pos) {
    this.pos = {
        x: pos ? pos.x : 0,
        y: pos ? pos.y : 0
    };
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = .97;
    this.size = 2;

    this.resistance = 1;
    this.gravity = 0;

    this.flick = false;

    this.alpha = 1;
    this.fade = 0;
    this.color = 0;
}

Particle.prototype.update = function() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    // gravity down
    this.vel.y += this.gravity;

    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // shrink
    this.size *= this.shrink;

    // fade out
    this.alpha -= this.fade;
};

Particle.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};

Particle.prototype.exists = function() {
    return this.alpha >= 0.1 && this.size >= 1;
};

/*

function Rocket(x) {
    Particle.apply(this, [{
        x: x,
        y: SCREEN_HEIGHT}]);

    this.explosionColor = 0;
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

Rocket.prototype.explode = function() {
    var count = Math.random() * 10 + 80;

    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 10;

        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = Math.random() * 0.05 + 0.93;

        particle.flick = true;
        particle.color = this.explosionColor;

        particles.push(particle);
    }
};*/

explode2 = function(i_pos, i_color) {
	var count = Math.random() * 10 + 80;
	//var l_exColor = Math.floor(Math.random() * 360 / 10) * 10;
	//var l_exColor = '#FFC0CB'; // rgb(102, 51, 153);
	// var l_exColor = 168; // rgb(102, 51, 153);
    for (var i = 0; i < count; i++) {
        var particle = new Particle(i_pos);
        var angle = Math.random() * Math.PI * 2;

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 10;

        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = Math.random() * 0.05 + 0.93;

        particle.flick = true;
        particle.color = i_color;

        particles.push(particle);
    }
}
/*
Rocket.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();

    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;

    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};

*/

var hat1;
var hat2;
var hat3;
var text;
var paws11;
var paws12;
var paws21;
var paws22;
var paws31;
var paws32;

var anim1;
var anim2;
var anim3;
var animText;

var hsl_blue 	= 241;
var hsl_red 	= 354;
var hsl_yellow 	= 57;


function onHatFinished1() {
	hat1.remove();
	//explode2({ x: 100, y : 100}, hsl_blue);
	explode2({ x: 100, y : 100}, hsl_blue);
	setInterval(loop, 1000 / 30);
//	text.fadeIn(1000);
}

function onHatFinished2() {
	hat2.remove();
	//explode2({ x: 100, y : 100}, hsl_blue);
	explode2({ x: 200, y : 100}, hsl_red);
	//setInterval(loop, 1000 / 50);
}

function onHatFinished3() {
	hat3.remove();
	//explode2({ x: 100, y : 100}, hsl_blue);
	explode2({ x: 300, y : 100}, hsl_yellow);
	//setInterval(loop, 1000 / 50);
}



/*var RadApp = new (function(){
	var that = this;*/

function initApp() {
		
		document.body.appendChild(canvas);
		canvas.width = SCREEN_WIDTH;
		canvas.height = SCREEN_HEIGHT;										
		
		// rl.setStart();
		
		paws11 = rl.image('PawsPhase1.png', 	190, 295, 	60, 70);
		paws12 = rl.image('PawsPhase2.png', 	200, 295, 	100, 90);
		
		body1 = rl.image('Body01.png', 	210, 335, 	80, 150);
		
		head1 = rl.image('Head01.png', 		200, 300, 	80, 50);					
		hat1 = rl.image('HatBlue01.png', 	230, 270, 	50, 50);
		
		
		
		//paws11.hide();
		paws12.hide();
		
		paws21 = rl.image('PawsPhase1.png', 	290, 295, 	60, 70);
		paws22 = rl.image('PawsPhase2.png', 	300, 295, 	100, 90);
		body2 = rl.image('Body01.png', 	310, 335, 	80, 150);
		
		head2 = rl.image('Head01.png', 		300, 300, 	80, 50);						
		hat2 = rl.image('HatRed01.png', 	330, 270, 	50, 50);
		
		paws22.hide();
		
		paws31 = rl.image('PawsPhase1.png', 	390, 295, 	60, 70);
		paws32 = rl.image('PawsPhase2.png', 	400, 295, 	100, 90);
		body3 = rl.image('Body01.png', 	410, 335, 	80, 150);
		
		head3 = rl.image('Head01.png', 		400, 300, 	80, 50);						
		hat3 = rl.image('HatYellow01.png', 	430, 270, 	50, 50);
		
		paws32.hide();
		
		text = rl.image('MainText.png', 100, 10, 500, 250);
		text.attr({opacity : 0});		
		
		
		anim1 = Raphael.animation( {	x : 100, 
				y : 100,
				transform : 'r-360'
			}, 2000, onHatFinished1 			
		);
		
		anim2 = Raphael.animation( {	x : 200, 
				y : 100,
				transform : 'r-360'
			}, 2000, onHatFinished2

		);
		
		anim3 = Raphael.animation( {	x : 300, 
				y : 100,
				transform : 'r-360'
			}, 2000, onHatFinished3

		);
		
		animText = Raphael.animation( {	
				opacity : 1
			}, 500
			
		);		
			

		
		//wait(1);
		// hat1.hide();
		//hat2.animate( anim.delay( 500 ) );
		
		// explode2({ x: 100, y : 100});
		
		
//		rl.setFinish();
		
		
				
};
	
function bnClick1(caller) {
	
	//caller.hide();
	var bn = document.getElementById("button1").style.visibility = "hidden";

	
	paws11.hide();
	paws12.show();
	
	paws21.hide();
	paws22.show();
	
	paws31.hide();
	paws32.show();
	
	hat1.animate( anim1.delay(0) );
	hat2.animate( anim2.delay(200) );
	hat3.animate( anim3.delay(150) );
	
	text.animate( animText.delay(3000));
}


//);

// ();	