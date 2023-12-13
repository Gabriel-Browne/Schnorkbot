import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';
import Boid from '../entities/Boid';

class BaseAi {
  constructor(entities) {
    this.boids = entities.filter((entity) => entity instanceof Boid);
    this.bots = entities.filter((entity) => entity instanceof Bot);
    this.zombies = entities.filter((entity) => entity instanceof Zombie);
  }
  // abstract method upateAll()
  updateAll() {
    pass;
  }

  // abstract method update()
  update() {
    pass;
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

  getDistance(entityOrPositionA, entityOrPositionB) {
    const position1 = entityOrPositionA.positionComponent
      ? entityOrPositionA.positionComponent
      : entityOrPositionA;
    const position2 = entityOrPositionB.positionComponent
      ? entityOrPositionB.positionComponent
      : entityOrPositionB;

    return Math.sqrt(
      Math.pow(position1.x - position2.x, 2) +
        Math.pow(position1.y - position2.y, 2)
    );
  }

  getDirectionVector(source, target) {
    const position = source.positionComponent
      ? source.positionComponent
      : source;

    const targetPosition = target.positionComponent
      ? target.positionComponent
      : target;

    const angle = Math.atan2(
      targetPosition.y - position.y,
      targetPosition.x - position.x
    );

    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  getPositionVector(source, target) {
    const sourcePosition = source.positionComponent
      ? source.positionComponent
      : source;
    const targetPosition = target.positionComponent
      ? target.positionComponent
      : target;

    return {
      x: targetPosition.x - sourcePosition.x,
      y: targetPosition.y - sourcePosition.y,
    };
  }

  setDirection(entity, direction) {
    const movement = entity.movementComponent;
    movement.direction.x = direction.x;
    movement.direction.y = direction.y;
  }

  setMovementTowards(entity, target) {
    const direction = this.getDirectionVector(entity, target);
    this.setDirection(entity, direction);
  }

  setMovementAwayFrom(entity, target) {
    const direction = this.getDirectionVector(entity, target);
    direction.x *= -1;
    direction.y *= -1;
    this.setDirection(entity, direction);
  }

  jiggleMovement(entityOrMovement, magnitude = 1) {
    const movement = entityOrMovement.movementComponent
      ? entityOrMovement.movementComponent
      : entity;

    movement.direction.x += this.randomNormal() * magnitude - magnitude / 2;
    movement.direction.y += this.randomNormal() * magnitude - magnitude / 2;
    return movement;
  }

  getMapCenter() {
    return {
      x: this.mapWidth / 2,
      y: this.mapHeight / 2,
    };
  }

  getClosestWall(entity) {
    const position = entity.positionComponent;
    const mapCenter = this.getMapCenter();
    const difference = this.getPositionVector(position, mapCenter);
    const horizontalDistance = Math.abs(difference.x);
    const verticalDistance = Math.abs(difference.y);
    // closer to vertical wall or horizontal wall?

    if (horizontalDistance < verticalDistance) {
      if (difference.x > 0) {
        return 'right';
      } else {
        return 'left';
      }
    } else {
      if (difference.y > 0) {
        return 'bottom';
      } else {
        return 'top';
      }
    }
  }

  getDistanceToClosestWall(entity) {
    const position = entity.positionComponent;
    const closestWall = this.getClosestWall(entity);
    if (closestWall === 'top') {
      return position.y;
    }
    if (closestWall === 'bottom') {
      return this.mapHeight - position.y;
    }
    if (closestWall === 'left') {
      return position.x;
    }
    if (closestWall === 'right') {
      return this.mapWidth - position.x;
    }
    return null;
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
}

export default BaseAi;
