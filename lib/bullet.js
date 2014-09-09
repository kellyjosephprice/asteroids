(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Bullet = Asteroids.Bullet = function (params) {
    Asteroids.MovingObject.call(this, params);
    
    this.color  = "hsl(52, 97%, 70%)";
    this.radius = 2;
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.prototype.isWrappable = false;
  
  Bullet.prototype.onMove = function () {
    if (this.ticksAlive >= 160) {
      this.game.remove(this);
    }
  };
  
  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      otherObject.explode();
      
      if (otherObject.radius >= Asteroids.Asteroid.RADIUS / 3) {
        for (var i = 0; i < 3; ++i) {
          this.game.add(
            new Asteroids.Asteroid({
              pos: otherObject.pos,
              game: this.game,
              radius: otherObject.radius / 2
            })
          );
        }
      }
      
      this.game.remove(this);
    }
  };
})();