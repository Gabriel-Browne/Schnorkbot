class ChunkSystem {
  constructor(chunkResolution) {
    this.chunkResolution = chunkResolution;
    this.chunks = {};
    this.entityChunks = {};
  }

  updateAll(entities) {
    let position, chunkX, chunkY, chunkKey, entity;
    for (entity of entities) {
      const chunkKey = this.getChunkKey(entity.position);

      this.addEntityToChunk(chunkKey, entity);
    }
  }

  getChunkKey(position) {
    const chunkX = Math.round(position.x / this.chunkResolution);
    const chunkY = Math.round(position.y / this.chunkResolution);
    return chunkX, chunkY;
  }

  addEntityToChunk(chunkKey, entity) {
    if (chunkKey in this.chunks) {
      this.chunks[chunkKey].add(entity);
    } else {
      this.chunks[chunkKey] = new Set([entity])
    }
  }

  removeEntityFromLastChunk(chunkKey, entity) {
    const visited = new Set();
    const frontier = [chunkKey];
    let currChunk, neighbors, neighbor;
    while (frontier.length > 0) {
      currChunk = frontier.pop();
      neighbors = this.getNeighborChunks(chunkKey);

      if (entity

      // add unvisited neighbors to the fontier
      for (neighbor of neighbors) {
        if (!neighbor in visited) {
          frontier.append(neighbor);
        }
      }
    }
  }

  getNeighborChunks(chunkKey) {
    const neighborKeys = [];
    const chunkX = chunkKey[0];
    const chunkY = chunkKey[1];
    for (let neighborX = chunkX - 1; neighborX < chunkX + 2; neighborX++) {
      for (let neighborY = chunkY - 1; neighborY < chunkY + 2; neighborY++) {
        const neighborKey = (neighborX, neighborY);
        if (neighborKey in this.chunks && neighborKey != chunkKey) {
          neighborKeys.append(chunkKey);
        }
      }
    }
    return neighborKeys;
  }

  entityInChunk(chunkKey, entity) {
    return entity in this.chunks[chunkKey];
  }

  removeEntityFromChunk(chunkKey) {
  }

  removeEntityFromChunks(chunkKeys, entity) {
    for (const chunkKey of chunkKeys) {
      if (!chunkKey in this.chunks) continue;
      const chunk = this.chunks[chunkKey];

      if (this.entityInChunk(chunkKey, entity)) {
        // find the index of the entity in the chunk (which is just a list of entities)
        const chunkIndex = this.chunks[chunkKey].indexOf(entity);
        this.chunks[chunkKey].pop(chunkIndex);
        return true;
      }
    }
    return false;
  }
}
