(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function () { 
    this.asteroids = [];
    this.addAsteroids();
    
    this.ship = new Asteroids.Ship({
      pos  : this.randomPosition(),
      game : this
    });
  };
  
  Game.DIM_X         = 800;
  Game.DIM_Y         = 600;
  Game.NUM_ASTEROIDS = 1;
  Game.FPS           = 60;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(
        new Asteroids.Asteroid({
          pos: this.randomPosition(),
          game: this
        })
      );
    }
  };
  
  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };
  
  Game.prototype.randomPosition = function () {
    return {
      x: Math.floor(Math.random() * Game.DIM_X),
      y: Math.floor(Math.random() * Game.DIM_Y)
    };
  };
  
  Game.prototype.draw = function (context) {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    this.allObjects().forEach(function(object) {
      object.draw(context);
    });
  }; 
  
  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };
  
  Game.prototype.wrap = function (pos) {
    return {
      x: (pos.x + Game.DIM_X) % Game.DIM_X,
      y: (pos.y + Game.DIM_Y) % Game.DIM_Y
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
  
  Game.prototype.remove = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };
  
  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };
})();