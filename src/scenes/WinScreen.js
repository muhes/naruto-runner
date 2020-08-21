import Phaser from "phaser";
var game = require('./Game')
import getScore from './Game'


let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'winscreen' });
  },
  create: function() {
    cursors = this.input.keyboard.createCursorKeys();
    const score = game.getScore()
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);
    const text = "You lost with a score of " + score +  "! Press space to restart."

    this.add.text(275, 300, text)
  },
  update: function () {

    if (cursors.space.isDown) {
      this.scene.start('mainmenu');
    }
  }
})