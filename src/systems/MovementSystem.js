class MovementSystem {
  constructor(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  update(entity) {
    const position = entity.positionComponent;
    const movement = entity.movementComponent;

    position.x += movement.direction.x * movement.speed;
    position.y += movement.direction.y * movement.speed;

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
