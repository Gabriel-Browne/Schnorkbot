import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';

class MovementSystem {
  constructor(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  updateAll(entities) {
    for (const entity of entities) {
      this.update(entity);
    }
  }

  update(entity) {
    const position = entity.positionComponent;
    const movement = entity.movementComponent;

    // Calculate the angle in radians
    const angle = Math.atan2(movement.direction.y, movement.direction.x);

    // Calculate the velocity components using trigonometric functions
    const velocityX = Math.cos(angle);
    const velocityY = Math.sin(angle);

    // console.log(velocityX, velocityY);

    // Update the position based on velocity components and speed
    position.x += velocityX * movement.speed;
    position.y += velocityY * movement.speed;

    if (position.x < 0) {
      position.x = 0;
      movement.direction.x *= -1;
    }
    if (position.x > this.mapWidth) {
      position.x = this.mapWidth;
      movement.direction.x *= -1;
    }

    if (position.y < 0) {
      position.y = 0;
      movement.direction.y *= -1;
    }

    if (position.y > this.mapHeight) {
      position.y = this.mapHeight;
      movement.direction.y *= -1;
    }
  }
}

export default MovementSystem;
