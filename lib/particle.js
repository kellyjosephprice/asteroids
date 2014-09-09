(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Particle = Asteroids.Particle = function (params) {
    Asteroids.MovingObject.call(this, params);
    
    this.color      = "hsl(25, 100%, 52%)";
    this.alpha      = 1.0;
    this.saturation = 100;
    this.radius     = 1;
    this.vel        = Asteroids.Util.randomVector(params.distance * 2 + Math.random());
  };
  
  Particle.inherits(Asteroids.MovingObject);
  
  Particle.prototype.isWrappable = false;
  
  Particle.prototype.fade = function () {
    if (this.alpha < 0) {
      this.game.remove(this);
    }
    
    this.color = "hsla(25, " + this.saturation + "%, 52%, " + this.alpha + ")";
    this.alpha -= 0.01;
    this.radius *= .99;
    this.saturation *= .95;
  };
})();