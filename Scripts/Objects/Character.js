// the most messy part

// character default
let frameX = 0;
let frameY = 0;
let playerImage = new Image();
const staggerFrames = 6;

// not used for now :(
//const targetfps = 60;

const spriteWidth = 32;
const spriteHeight = 32;
let charOrientation = "South";

// charspeed is charbasespeed except when moving in diagonal, in this case it's multiplied by 1/sqrt(2)
const charbasespeed = 3;
let charspeed = 0;

let player = [];

class Player {
  constructor(x, y, PlayerDefinition) {
    this.x = x;
    this.y = y;
    this.height = PlayerDefinition.height;
    this.width = PlayerDefinition.width;
    this.birth = gameFrame;
    this.image = PlayerDefinition.imgsource;
    this.age = 0;
    this.spx = 0;
    this.spy = 0;
    this.noise = PlayerDefinition.noise;
    this.spriteXmax = PlayerDefinition.spriteXmax;
    this.spriteYRow = 0;
    this.orientation = "South";
  }

  updateP() {
    // raw move
    //  charpos.x+=(mouse.x-charpos.x)*0.1
    //  charpos.y+=(mouse.y-charpos.y)*0.1

    if (
      Math.abs(mouse.x - charpos.x) > charspeed &&
      Math.abs(mouse.y - charpos.y) > charspeed
    ) {
      charspeed = charbasespeed * 0.70710678118;
    } else {
      charspeed = charbasespeed;
    }

    //Check if move right or left for movement

    if (Math.abs(mouse.x - charpos.x) > charspeed) {
      if (mouse.x - charpos.x > 0) {
        charpos.x += charspeed;
      } else charpos.x -= charspeed;
    } else {
      charpos.x = mouse.x;
    }

    //Check if move up or down for movement

    if (Math.abs(mouse.y - charpos.y) > charspeed) {
      if (mouse.y - charpos.y > 0) {
        charpos.y += charspeed;
      } else charpos.y -= charspeed;
    } else {
      charpos.y = mouse.y;
    }

    //Check for animation direction
    // else idle

    if (mouse.y - charpos.y != 0 || mouse.x - charpos.x != 0) {
      if (Math.abs(mouse.y - charpos.y) > Math.abs(mouse.x - charpos.x)) {
        if (mouse.y - charpos.y > 0) {
          frameY = 0;
          charOrientation = "South";
        } else {
          frameY = 2;
          charOrientation = "North";
        }
      } else {
        if (mouse.x - charpos.x > 0) {
          frameY = 3;
          charOrientation = "East";
        } else {
          frameY = 1;
          charOrientation = "West";
        }
      }
    } else {
      frameY = 4;
      charOrientation = "South";
    }
    if (gameFrame % staggerFrames == 0) {
      if (frameX < 2) frameX++;
      else frameX = 0;
    }
  }

  drawP() {
    // draw character
    ctx.drawImage(
      this.image, //source
      frameX * this.width, //sourcex
      frameY * this.height, //sourcey
      this.width, //sourcewidth
      this.height, //sourceheight
      charpos.x - this.width * 0.5, //destinationx
      charpos.y - this.height * 0.5, //destinationy
      this.width, //destination width
      this.height //destination height
    );
  }
}
