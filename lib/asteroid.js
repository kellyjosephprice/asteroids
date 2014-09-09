(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function (params) {
    Asteroids.MovingObject.call(
      this,
      {
        color  : this.randomColor(),
        radius : params.radius,
        pos    : params.pos,
        vel    : Asteroids.Util.randomVector(this.velocity(params.radius )),
        game   : params.game
      }
    );
  };
    
  Asteroid.COLOR  = "hsl(200, 5%, 60%)";
  Asteroid.RADIUS = 60; 
  Asteroid.SPEED  = 1;
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.prototype.randomColor = function () {
    var hue = 150 * Math.floor(75 * Math.random());
    var sat = 1 + Math.floor(10 * Math.random());
    
    return "hsl(" + hue + ", " + sat + "%, 60%)";
  }
  
  Asteroid.prototype.velocity = function (radius) {
    return Asteroid.RADIUS / (30 + radius / 2);
  };
  
  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
  
  Asteroid.prototype.explode = function () {
    for (var i = 0; i < 2 * this.radius; ++i) {
      this.game.add(
        new Asteroids.Particle({
          pos: this.pos,
          game: this.game,
          distance: this.radius / Asteroid.RADIUS
        })
      );
    }
  };
})();