(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function (pos) {
    Asteroids.MovingObject.call(
      this,
      {
        color  : Asteroid.COLOR,
        radius : Asteroid.RADIUS,
        pos    : pos,
        vel    : Asteroids.Util.randomVec(Asteroid.SPEED)
      }
    );
  };
    
  Asteroid.COLOR  = "#000000";
  Asteroid.RADIUS = 60; 
  Asteroid.SPEED  = 1.2;
  
  Asteroid.inherits(Asteroids.MovingObject);
  
})();