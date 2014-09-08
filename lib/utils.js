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
  
  Util.randomVec = function (length) {
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
})();