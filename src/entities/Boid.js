import * as PIXI from 'pixi.js';

import PositionComponent from '../components/PositionComponent.js';
import MovementComponent from '../components/MovementComponent.js';

const BOID_SPEED = 0.5;

class Boid {
  constructor(x, y) {
    this.positionComponent = new PositionComponent(x, y);
    this.movementComponent = new MovementComponent(BOID_SPEED);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    // change color to green
    this.sprite.tint = 0x0000ff;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Boid;
