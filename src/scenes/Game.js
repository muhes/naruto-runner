import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/konoha.png";
import player from "../assets/naruto-body-resize.png";
import star from "../assets/ninjastar.png"
import { accelerate, decelerate } from "../utils";

let myPlayer;
let cursors;
let stars
var score;

export function getScore(){
  return score
}

export function resetScore(){
  console.log("hello ", score)
  score = 0
  console.log("bye ", getScore())
}


let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 100,
  playerStartPosition: 400,
  jumps: 2
}

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    this.load.spritesheet('player', player, {
      frameWidth: 266,
      frameHeight: 280,
      //gravity: playerGravity
    });
    

    //this.player = this.physics.add.sprite(gameOptions.playerStartPosition, 0, "player");
    //this.player.setGravityY(gameOptions.playerGravity);


    this.load.image("star", star);
  },
  
  create: function create() {
    score = 0
    
    this.add.image(650, 300, "background");
    this.addStars()

    cursors = this.input.keyboard.createCursorKeys();

    myPlayer = this.physics.add.image(100, 100, "player", 15);
    myPlayer.setGravityY(400)
    myPlayer.setGravityX(0)
    myPlayer.x = 200
    //myPlayer.y = -50
    //myPlayer.playerStartPosition(200)

    const processCollision = (myPlayer , star) => {
      //tiles.destroy(); 
      /*
      const starsLeft = stars.countActive();
      if (starsLeft === 0) {
        this.scene.start('winscreen');
      }
      */
     this.scene.start('winscreen');
    }
    
    this.physics.add.collider(
      stars,
      myPlayer,
      processCollision,
      null,
      this
    );
      

    //myPlayer.setBounce(1, 1);
    myPlayer.setCollideWorldBounds(true);
  },
  addStars() {
    stars = this.physics.add.group({
      key: 'star',
      repeat: 3,
      setScale: {x: 0.2, y: 0.2 },
      setXY: { x:800, y: 800 }
    });

    stars.children.iterate(function (child) {
      //child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setVelocityX(150 - Math.random() * 300);
      child.setGravityX(-10)
      //child.setVelocityY(150 - Math.random() * 300);
      //child.setBounce(1, 1);
      child.setCollideWorldBounds(true);
    }); 
  },
  counter(score){
    console.log("score here", score)
    score+=1
    return score
  },
  update: function () {
    const { velocity } = myPlayer.body;
    let  newStars
    console.log("score = ", score)
    score = this.counter(getScore())
    console.log(score)
    stars.children.iterate(function (child) {
      if (child.x < 40  ){
        child.x = 1200
        const height = Math.floor(Math.random() * 1000) + 1;
        child.y = height
      }
    }); 
    

/*
    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      myPlayer.setVelocity(x, y)
    }
*/
    //if (cursors.soace.)
    if (cursors.space.isDown) myPlayer.setVelocityY(accelerate(velocity.y, -2)); 
    if (cursors.right.isDown) myPlayer.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) myPlayer.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) myPlayer.setVelocityX(accelerate(velocity.x, -1));
  }
});