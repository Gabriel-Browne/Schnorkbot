import * as PIXI from 'pixi.js';

import Position from '../components/Position.js';
import Velocity from '../components/Velocity.js';
import Hitbox from '../components/Hitbox.js';

const ZOMBIE_SPEED = 1;

class Zombie {
  constructor(x, y) {
    this.chunk = -1;
    this.position = new Position(x, y);
    this.velocity = new Velocity(ZOMBIE_SPEED);
    this.hitbox = new Hitbox(this.position, 10);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.tint = 0xff0000;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Zombie;
