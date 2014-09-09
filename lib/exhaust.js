(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Exhaust = Asteroids.Exhaust = function (params) {
    Asteroids.MovingObject.call(this, params);
    
    this.hue    = this.randomHue();
    this.color  = "hsl(" + this.hue + ", 100%, 52%)";
    this.alpha  = 1.0;
    this.radius = 3.5;
    this.saturation = 100;
  };
  
  Exhaust.inherits(Asteroids.MovingObject);
  
  Exhaust.prototype.isWrappable = false;
  
  Exhaust.prototype.randomHue = function () {
    return Math.floor(Math.random() * 60);
  };
  
  Exhaust.prototype.fade = function () {
    if (this.alpha < 0) {
      this.game.remove(this);
    }
    
    this.color = "hsla(" + this.hue + ", " + this.saturation + "%, 52%, " + this.alpha + ")";
    this.saturation = Math.floor(this.saturation * .95);
    this.alpha -= 0.015;
    this.radius *= .99;
    this.vel = Asteroids.Util.scaleVector(this.vel, 0.95);
  };
})();