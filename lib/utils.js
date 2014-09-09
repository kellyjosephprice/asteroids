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
  
  Util.scaleVector = function(vector, scalar) {  
    return {
      x: vector.x * scalar,
      y: vector.y * scalar
    };
  };
  
  Util.smudgeVector = function(vector) {
    var direction = Util.direction(vector);
    var newDirection = direction + (.15 - .3 * Math.random());    
    var distance  = Util.distance(vector);
    
    return {
      x: Math.cos(newDirection) * distance,
      y: Math.sin(newDirection) * distance
    };
  };
  
  Util.direction = function(vector) {
    return Math.atan2(vector.y, vector.x);
  };
  
  Util.setMagnitude = function (vector, scalar) {
    var theta = Util.direction(vector);
    
    return {
      x: Math.cos(theta) * scalar,
      y: Math.sin(theta) * scalar
    };
  };
  
  Util.reverseVector = function (vector) {
    return {
      x: -(vector.x),
      y: -(vector.y)
    };
  };
  
  Util.distance = function (left, right) {
    if (typeof right === "undefined") {
      right = Util.ZERO_VECTOR;
    }
    
    var floorX = left.x - right.x;
    var floorY = left.y - right.y;
    
    return Math.sqrt(
      Math.pow(floorX, 2) + Math.pow(floorY, 2)
    );
  };
})();