import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';

class BaseAi {
  constructor(entities) {
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

  getDistance(entityA, entityB) {
    return entityA.position.getDistance(entityB.position);
  }

  setDirectionTowards(sourceEntity, targetEntity) {
    const direction = this.getDirectionTowards(sourceEntity, targetEntity);
    sourceEntity.velocity.setDirection(direction.x, direction.y);
  }

  getDirectionTowards(sourceEntity, targetEntity) {
    const sourcePosition = sourceEntity.position;
    const targetPosition = targetEntity.position;

    const angle = Math.atan2(
      targetPosition.y - sourcePosition.y,
      targetPosition.x - sourcePosition.x
    );

    return { x: Math.cos(angle), y: Math.sin(angle) };
  }

  getDirectionAwayFrom(sourceEntity, targetEntity) {
    const directionTowards = this.getDirectionTowards(
      sourceEntity,
      targetEntity
    );
    // inverse the "directionTowards"
    return { x: -directionTowards.x, y: -directionTowards.y };
  }

  setDirectionAwayFrom(entity, target) {
    const direction = this.getDirectionAwayFrom(entity, target);
    entity.velocity.setDirection(direction.x, direction.y);
  }

  jiggle(entity, magnitude = 0.1) {
    const jiggle = this.getJiggle(entity, magnitude);
    entity.velocity.setDirection(jiggle.x, jiggle.y);
  }

  getJiggle(entity, magnitude = 0.1) {
    const movement = entity.velocity;
    return {
      x: movement.direction.x + this.randomNormal() * magnitude - magnitude / 2,
      y: movement.direction.y + this.randomNormal() * magnitude - magnitude / 2,
    };
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
