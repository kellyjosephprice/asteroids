(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MovingObject = Asteroids.MovingObject = function (params) {
    this.pos    = params.pos;
    this.vel    = params.vel;
    this.radius = params.radius;
    this.color  = params.color;
    this.game   = params.game;
  };
  
  MovingObject.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    
    context.arc(
      Math.floor(this.pos.x), Math.floor(this.pos.y),
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    
    context.fill();
  };
  
  MovingObject.prototype.move = function () {
    this.pos = this.game.wrap(
      Asteroids.Util.addVectors(this.pos, this.vel)
    );
  };
  
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return Asteroids.Util.distance(this.pos, otherObject.pos) <=
      this.radius + otherObject.radius;
  };
  
  MovingObject.prototype.collideWith = function (otherObject) { };
})();