import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';

class MovementSystem {
  constructor(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  updateAll(entities) {
    // filter is entity isinstance Zombie
    const zombies = entities.filter((entity) => entity instanceof Zombie);
    // bots
    const bots = entities.filter((entity) => entity instanceof Bot);

    let closest;

    for (const bot of bots) {
      closest = this.getClosest(bot, zombies);
      if (Math.random() > 0.1) {
        this.update(bot);
        continue;
      }
      if (closest) {
        this.setMovementAwayFrom(bot, closest);
      } else {
        this.jiggleMovement(bot);
      }
      this.update(bot);
    }

    for (const zombie of zombies) {
      closest = this.getClosest(zombie, bots);
      if (Math.random() > 0.1) {
        this.update(zombie);
        continue;
      }
      if (closest) {
        this.setMovementTowards(zombie, closest);
      } else {
        this.jiggleMovement(zombie);
      }
      this.update(zombie);
    }
  }

  getClosest(entity, entities) {
    let closest = null;
    let closestDistance = Infinity;

    for (const e of entities) {
      const distance = this.getDistance(entity, e);

      if (distance < closestDistance) {
        closestDistance = distance;
        closest = e;
      }
    }

    return closest;
  }

  getDistance(entity1, entity2) {
    const position1 = entity1.positionComponent;
    const position2 = entity2.positionComponent;

    return Math.sqrt(
      Math.pow(position1.x - position2.x, 2) +
        Math.pow(position1.y - position2.y, 2)
    );
  }

  setMovementTowards(entity, target) {
    const position = entity.positionComponent;
    const movement = entity.movementComponent;

    const targetPosition = target.positionComponent;

    const angle = Math.atan2(
      targetPosition.y - position.y,
      targetPosition.x - position.x
    );

    movement.direction.x = Math.cos(angle);
    movement.direction.y = Math.sin(angle);
  }

  setMovementAwayFrom(entity, target) {
    const position = entity.positionComponent;
    const movement = entity.movementComponent;

    const targetPosition = target.positionComponent;

    const angle = Math.atan2(
      targetPosition.y - position.y,
      targetPosition.x - position.x
    );

    movement.direction.x = -Math.cos(angle);
    movement.direction.y = -Math.sin(angle);
  }

  jiggleMovement(entity, magnitude = 0.1) {
    const movement = entity.movementComponent;
    console.log(this.randomNormal() * magnitude - magnitude / 2);
    movement.direction.x += this.randomNormal() * magnitude - magnitude / 2;
    movement.direction.y += this.randomNormal() * magnitude - magnitude / 2;
  }

  /*
   * Returns a random number between 0 (inclusive) and 1 (exclusive)
   * following a normal distribution.
   * Source: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
   */
  randomNormal() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
    return num;
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
