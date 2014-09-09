(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function () { 
    this.asteroids = [];
    this.bullets   = [];
    this.exhausts  = [];
    this.particles = [];
    
    this.addAsteroids();
    
    this.ship = new Asteroids.Ship({
      pos  : this.randomPosition(),
      game : this
    });
  };
  
  Game.DIM_X         = 800;
  Game.DIM_Y         = 600;
  Game.NUM_ASTEROIDS = 4;
  Game.FPS           = 60;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(
        new Asteroids.Asteroid({
          pos    : this.randomPosition(),
          game   : this,
          radius : Asteroids.Asteroid.RADIUS
        })
      );
    }
  };
  
  Game.prototype.allObjects = function () {
    return this.asteroids.
      concat(this.particles).
      concat(this.bullets).
      concat(this.exhausts).
      concat(this.ship);
  };

  
  Game.prototype.randomPosition = function () {
    return {
      x: Math.floor(Math.random() * Game.DIM_X),
      y: Math.floor(Math.random() * Game.DIM_Y)
    };
  };
  
  Game.prototype.draw = function (context, background) {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    context.drawImage(background, 0, 0);
    
    this.allObjects().forEach(function(object) {
      object.draw(context);
    });
  }; 
  
  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };
  
  Game.prototype.wrap = function (object) {
    var x = object.pos.x;
    var y = object.pos.y;
    
    if (x < -(object.radius)) {
      x = Game.DIM_X + object.radius;
    } else if (x > Game.DIM_X + object.radius) {
      x = -(object.radius);
    } else if (y < -(object.radius)) {
      y = Game.DIM_Y + object.radius;
    } else if (y > Game.DIM_Y + object.radius) {
      y = -(object.radius);
    }
    
    return {
      x: x,
      y: y
    };
  };
  
  Game.prototype.checkCollisions = function () {
    this.allObjects().forEach(function(obj1) {
      this.allObjects().forEach(function(obj2) {
        if (obj1 === obj2) {
          return;
        }
        
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    }.bind(this));
  };
  
  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Exhaust) {
      this.exhausts.push(object);
    } else if (object instanceof Asteroids.Particle) {
      this.particles.push(object);
    }
  };
  
  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Asteroids.Exhaust) {
      this.exhausts.splice(this.exhausts.indexOf(object), 1);
    } else if (object instanceof Asteroids.Particle) {
      this.particles.splice(this.particles.indexOf(object), 1);
    }
  };
  
  Game.prototype.slowShip = function () {
    this.ship.drag();
  };
  
  Game.prototype.fadeParticles = function () {
    this.exhausts.forEach(function(exhaust) {
      exhaust.fade();
    });
    this.particles.forEach(function(particle) {
      particle.fade();
    });
  };
  
  Game.prototype.step = function () {
    this.moveObjects();
    this.slowShip();
    this.fadeParticles();
    this.checkCollisions();
  };
  
  Game.prototype.isOutOfBounds = function (pos) {
    return pos.x < 0 || pos.y < 0 ||
      pos.x > Game.DIM_X || pos.y > Game.DIM_Y;
  };
})();