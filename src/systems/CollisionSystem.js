// runtime complexity is O(n^2) where n is the number of entities
// not optimal! but not a bad start

class CollisionSystem {
  update(entities) {
    for (let i = 0; i < entities.length - 1; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        console.log(i, j);
        // if (this.collision(entities[i].hitbox, entities[j].hitbox)) {
        //   // i dont know if this is the best way to do this
        //   // maybe another component should define collision behavior...
        //   // but this is fine for now
        //   entities[i].hitbox.onCollision(entities[j]);
        //   entities[j].hitbox.onCollision(entities[i]);
        // }
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
