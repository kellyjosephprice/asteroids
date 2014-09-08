(function () {
  if (typeof Function.prototype.inherits === "undefined") {
    Function.prototype.inherits = function (superClass) {
      var Surrogate = function () {};

      Surrogate.prototype = superClass.prototype;
      this.prototype = new Surrogate();

      return this;
    };
  }
  
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Util = Asteroids.Util = {};
  
  Util.ZERO_VECTOR = { x: 0, y: 0 };
  
  Util.randomVector = function (length) {
    var theta = Math.random() * 2 * Math.PI;
    
    return {
      x : Math.sin(theta) * length,
      y : Math.cos(theta) * length
    };
  };
  
  Util.addVectors = function () {
    return Array.prototype.reduce.call(arguments, function(prev, next) {
      return {
        x : prev.x + next.x,
        y : prev.y + next.y
      };
    });
  };
  
  Util.distance = function (left, right) {
    var floorX = Math.floor(left.x) - Math.floor(right.x);
    var floorY = Math.floor(left.y) - Math.floor(right.y);
    
    return Math.sqrt(
      Math.pow(floorX, 2) + Math.pow(floorY, 2)
    );
  };
})();