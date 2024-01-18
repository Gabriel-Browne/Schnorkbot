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

  // position = position + velocity
  update(entity) {
    const position = entity.position;
    const velocity = entity.velocity;

    // Update the position based on velocity components and speed
    position.x += velocity.direction.x * velocity.speed;
    position.y += velocity.direction.y * velocity.speed;

    if (position.x < 0) {
      position.x = 0;
      velocity.direction.x *= -1;
    }
    if (position.x > this.mapWidth) {
      position.x = this.mapWidth;
      velocity.direction.x *= -1;
    }

    if (position.y < 0) {
      position.y = 0;
      velocity.direction.y *= -1;
    }

    if (position.y > this.mapHeight) {
      position.y = this.mapHeight;
      velocity.direction.y *= -1;
    }
  }
}

export default MovementSystem;
