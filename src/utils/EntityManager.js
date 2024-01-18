import Zombie from '../entities/Zombie.js';
import Bot from '../entities/Bot.js';

// this class defines an object that essentially is just a list of entities,
// the class provides some methods that may be useful when dealing with entities
class EntityManager {
  constructor() {
    this.entities = [];
    this.entitiesByType = {};
  }

  addEntity(entity) {
    this.entities.push(entity);
    if (this.entitiesByType[entity.constructor.name]) {
      this.entitiesByType[entity.constructor.name].push(entity);
    } else {
      this.entitiesByType[entity.constructor.name] = [entity];
    }
  }

  removeEntity(entity) {
    this.entities = this.entities.filter((e) => e !== entity);
    this.entitiesByType[entity.constructor.name] = this.entitiesByType[
      entity.constructor.name
    ].filter((e) => e !== entity);
  }

  getEntitiesByType(type) {
    return this.entitiesByType[type];
  }

  getBots() {
    return this.getEntitiesByType(Bot.name);
  }

  getZombies() {
    return this.getEntitiesByType(Zombie.name);
  }

  removeAllEntitiesOfType(type) {
    this.entities = this.entities.filter((e) => !(e instanceof type));
    this.entitiesByType[type.name] = [];
  }
}

export default EntityManager;
