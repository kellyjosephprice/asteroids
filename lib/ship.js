(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function (params) {
    Asteroids.MovingObject.call(this, params);
    
    this.vel    = Asteroids.Util.ZERO_VECTOR;
    this.color  = Ship.COLOR;
    this.radius = Ship.RADIUS;
  };
  
  Ship.COLOR  = "#ff0000";
  Ship.RADIUS = 5;
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = Asteroids.Util.ZERO_VECTOR;
  };
  
  Ship.prototype.power = function (impulse) {
    this.vel = Asteroids.Util.addVectors(this.vel, impulse);
  };
})();