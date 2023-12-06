import * as PIXI from 'pixi.js';

import PositionComponent from '../components/PositionComponent.js';
import MovementComponent from '../components/MovementComponent.js';

const ZOMBIE_SPEED = 2;

class Zombie {
  constructor(x, y) {
    this.positionComponent = new PositionComponent(x, y);
    this.movementComponent = new MovementComponent(ZOMBIE_SPEED);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Zombie;
