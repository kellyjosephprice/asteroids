(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameView = Asteroids.GameView = function (game, drawingContext) {
    this.game = game;
    this.context = drawingContext;
  };
  
  GameView.prototype.start = function () {
    setInterval(function() {
      this.game.moveObjects();
      this.game.draw(this.context);
    }.bind(this), 1);
  };
})();