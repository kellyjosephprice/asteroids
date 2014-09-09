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
  
  Ship.COLOR        = "hsl(220, 60%, 50%)";
  Ship.RADIUS       = 5;
  Ship.MAX_VELOCITY = 5;
  
  Ship.ACCELERATION = 1.1;
  Ship.POWER_STEP   = 0.25;
  Ship.DRAG_AMOUNT  = 0.9925;
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = Asteroids.Util.ZERO_VECTOR;
  };
  
  Ship.prototype.power = function (impulse) {
    var newVel = Asteroids.Util.addVectors(this.vel, impulse);  
    var distance = Asteroids.Util.distance(Asteroids.Util.ZERO_VECTOR, newVel);
   
    if (distance < 5) {
      this.fireEngine(impulse);
      this.vel = newVel;
    }
  };
  
  Ship.prototype.fireEngine = function (impulse) {
    var vector = Asteroids.Util.scaleVector(
      impulse, 
      24
      //Asteroids.Util.distance(this.vel)
    );
    vector = Asteroids.Util.reverseVector(vector);
    vector = Asteroids.Util.smudgeVector(vector);
    
    console.log(vector);
    
    this.game.add(
      new Asteroids.Exhaust({
        game : this.game,
        pos  : this.pos,
        vel  : vector
      })
    );
  };
  
  Ship.prototype.drag = function () {
    this.vel = Asteroids.Util.scaleVector(this.vel, Ship.DRAG_AMOUNT);
  };
  
  Ship.prototype.fireBullet = function () {
    this.game.add(
      new Asteroids.Bullet({
        game : this.game,
        pos  : this.pos,
        vel  : Asteroids.Util.setMagnitude(this.vel, 6)
      })
    );
  };
})();