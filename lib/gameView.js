(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function (game, drawingContext) {
    this.game = game;
    this.context = drawingContext;
  };
  
  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    
    setInterval(function() {
      this.game.step();
      this.game.draw(this.context);
    }.bind(this), 1000 / Asteroids.Game.FPS);
  };
  
  GameView.prototype.bindKeyHandlers = function () {
    key('w, up', function() {
      this.game.ship.power({
        x: 0,
        y: -.5
      });
    }.bind(this));
    key('a, left', function() {
      this.game.ship.power({
        x: -.5,
        y: 0
      });
    }.bind(this));
    key('s, down', function() {
      this.game.ship.power({
        x: 0,
        y: .5
      });
    }.bind(this));
    key('d, right', function() {
      this.game.ship.power({
        x: .5,
        y: 0
      });
    }.bind(this));
  };
})();