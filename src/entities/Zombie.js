import * as PIXI from 'pixi.js';
import Position from '../components/Position';
import Velocity from '../components/Velocity';
// const INIT_ZOMBIE_SPEED

class Zombie {
  INIT_SPEED = 1;

  constructor(x, y) {
    this.position = new Position(x, y);
    this.velocity = new Velocity(Zombie.INIT_ZOMBIE_SPEED);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Zombie;
