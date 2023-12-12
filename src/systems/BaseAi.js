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

  getDistance(entity1, entity2) {
    const position1 = entity1.positionComponent;
    const position2 = entity2.positionComponent;

    return Math.sqrt(
      Math.pow(position1.x - position2.x, 2) +
        Math.pow(position1.y - position2.y, 2)
    );
  }

  getDirectionVector(source, target) {
    const pos = source.positionComponent || source.position || source;
    const targetPos = target.positionComponent || target.position || target;

    const angle = Math.atan2(targetPos.y - pos.y, targetPos.x - pos.x);

    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  getPositionVector(source, target) {
    const sourcePosition =
      source.positionComponent || source.position || source;
    const targetPosition =
      target.positionComponent || target.position || target;

    return {
      x: targetPosition.x - sourcePosition.x,
      y: targetPosition.y - sourcePosition.y,
    };
  }

  setMovementTowards(entity, target) {
    const direction = this.getDirectionVector(entity, target);
    const movement = entity.movementComponent || entity.movement;
    movement.direction.x = direction.x;
    movement.direction.y = direction.y;
  }

  setMovementAwayFrom(entity, target) {
    const direction = this.getDirectionVector(entity, target);
    const movement = entity.movementComponent || entity.movement;
    movement.direction.x = -direction.x;
    movement.direction.y = -direction.y;
  }

  jiggleMovement(entity, magnitude = 0.1) {
    const movement = entity.movementComponent;
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
}

export default BaseAi;
