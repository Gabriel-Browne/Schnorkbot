import * as PIXI from 'pixi.js';

import Position from '../components/Position.js';
import Velocity from '../components/Velocity.js';
import Hitbox from '../components/Hitbox.js';

const BOT_SPEED = 2;

class Bot {
  constructor(x, y) {
    this.chunk = -1;

    this.position = new Position(x, y);
    this.velocity = new Velocity(BOT_SPEED);
    this.hitbox = new Hitbox(this.position, 10);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    // change color to green
    this.sprite.tint = 0x0fff00;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Bot;
