// this entity definition is basically a copy-paste of the Bot entity definition, so refer to that for comments.

import * as PIXI from 'pixi.js';
import Position from '../components/Position.js';
import Velocity from '../components/Velocity.js';

class Zombie {
  INIT_SPEED = 1;

  constructor(x, y) {
    this.position = new Position(x, y);
    this.velocity = new Velocity(this.INIT_SPEED);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.tint = 0xff0000;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Zombie;
