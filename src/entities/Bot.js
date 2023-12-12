import * as PIXI from 'pixi.js';

import PositionComponent from '../components/PositionComponent.js';
import MovementComponent from '../components/MovementComponent.js';

const BOT_SPEED = 2;

class Bot {
  constructor(x, y) {
    this.positionComponent = new PositionComponent(x, y);
    this.movementComponent = new MovementComponent(BOT_SPEED);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    // change color to green
    this.sprite.tint = 0x00ff00;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Bot;
