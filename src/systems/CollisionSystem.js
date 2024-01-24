// runtime complexity is O(n^2) where n is the number of entities
// not optimal! but not a bad start
import Hitbox from '../components/Hitbox.js';
import Chunk from '../components/Chunk.js';

class CollisionSystem {
  constructor(chunkSystem) {
    this.chunkSystem = chunkSystem;
  }

  updateAll(entities) {
    for (const entity of entities) {
      const entityHitbox = entity.hitbox;

      const chunk = this.chunkSystem.getEntityChunk(entity);

      const neighborhood = this.chunkSystem.getNeighborhood(chunk);

      for (const c in neighborhood) {
        for (const neighborEntity of c.entities) {
          const neighborHitbox = neighborEntity.hitbox;
          if (this.collision(entityHitbox, neighborHitbox)) {
            console.log('wahoo!');
          }
        }
      }
    }
  }

  collision(hbox, jbox) {
    for (const vertex in jbox.vertices) {
      if (hbox.contains(vertex)) {
        return true;
      }
    }
    return false;
  }
}

export default CollisionSystem;
