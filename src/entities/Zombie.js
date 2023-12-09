import * as PIXI from 'pixi.js';

import PositionComponent from '../components/PositionComponent.js';
import MovementComponent from '../components/MovementComponent.js';
import SquareCollisionComponent from '../components/SquareCollisionComponent.js';

const ZOMBIE_SPEED = 2;

class Zombie {
  constructor(x, y) {
    this.position = new PositionComponent(x, y);
    this.movement = new MovementComponent(ZOMBIE_SPEED);
    this.hitbox = new SquareCollisionComponent(this.position, 300);
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }

  onCollision(entity) {
    this.sprite.tint = 0xff0000;
    // console.log('collision with', entity);
  }
}

export default Zombie;
