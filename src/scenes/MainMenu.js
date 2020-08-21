import Phaser from "phaser";
var game = require('./Game')

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'mainmenu' });
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);


    this.add.text(270, 330, "Press spacebar to jump.")
  },
  update: function () {

    if (cursors.space.isDown) {
      game.resetScore()
      this.scene.start('game');
    }
  }
})