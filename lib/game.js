(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function () { 
    this.asteroids = [];
    this.addAsteroids();
  };
  
  Game.DIM_X         = 800;
  Game.DIM_Y         = 600;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(
        new Asteroids.Asteroid(this.randomPosition())
      );
    }
  };
  
  Game.prototype.randomPosition = function () {
    return {
      x: Math.floor(Math.random() * Game.DIM_X),
      y: Math.floor(Math.random() * Game.DIM_Y)
    };
  };
  
  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(context);
    });
  }; 
  
  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };
})();