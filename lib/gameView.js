(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function (game, drawingContext) {
    this.game = game;
    this.context = drawingContext;
    this.background = new Image();
    this.background.src = "bg.gif";
  };
  
  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    
    setInterval(function() {
      this.game.step();
      this.game.draw(this.context, this.background);
    }.bind(this), 1000 / Asteroids.Game.FPS);
  };
  
  GameView.prototype.bindKeyHandlers = function () {
    key('w, up', function() {
      this.game.ship.power({
        x: 0,
        y: -Asteroids.Ship.POWER_STEP
      });
    }.bind(this));
    key('a, left', function() {
      this.game.ship.power({
        x: -Asteroids.Ship.POWER_STEP,
        y: 0
      });
    }.bind(this));
    key('s, down', function() {
      this.game.ship.power({
        x: 0,
        y: Asteroids.Ship.POWER_STEP
      });
    }.bind(this));
    key('d, right', function() {
      this.game.ship.power({
        x: Asteroids.Ship.POWER_STEP,
        y: 0
      });
    }.bind(this));
    
    key('space', function() {
      this.game.ship.fireBullet();
    }.bind(this));
  };
})();