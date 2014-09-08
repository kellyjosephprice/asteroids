(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function (params) {
    Asteroids.MovingObject.call(
      this,
      {
        color  : Asteroid.COLOR,
        radius : Asteroid.RADIUS,
        pos    : params.pos,
        vel    : Asteroids.Util.randomVector(Asteroid.SPEED),
        game   : params.game
      }
    );
  };
    
  Asteroid.COLOR  = "#ffffff";
  Asteroid.RADIUS = 60; 
  Asteroid.SPEED  = 1;
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();