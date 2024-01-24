import Chunk from '../components/Chunk.js';

class ChunkSystem {
  constructor(chunkResolution) {
    this.chunkResolution = chunkResolution;
    this.chunks = {};
    this.entityChunkKey = {};
  }

  updateAll(entities) {
    for (const entity of entities) {
      this.updateEntityChunk(entity);
      console.log('chunks', this.chunks);
      console.log('entityChunkKey', this.entityChunkKey);
    }
  }

  getChunkKey(position) {
    const chunkX = Math.round(position.x / this.chunkResolution);
    const chunkY = Math.round(position.y / this.chunkResolution);
    // lol
    return { x: chunkX, y: chunkY };
  }

  updateEntityChunk(entity) {
    const chunkKey = this.getChunkKey(entity.position);

    const oldChunkKey = this.entityChunkKey[entity];

    // delete the entity from its last chunk
    if (oldChunkKey in this.chunks) {
      this.chunks[oldChunkKey].deleteEntity(entity);
    }

    // instantiate a new chunk if necessary,
    // put the entity inside of it
    if (chunkKey in this.chunks) {
      this.chunks[chunkKey].addEntity(entity);
    } else {
      // there's a shorthand to do this. in python its **chunkKey instead of how I parameterize here
      // don't know how to do it in JavaScript though
      this.chunks[chunkKey] = new Chunk(chunkKey[0], chunkKey[1]);
    }
    // update the entityChunk map so we can lookup both ways
    this.entityChunkKey[entity] = chunkKey;
  }

  getNeighbors(chunk) {
    const chunkKey = (chunk.row, chunk.col);
    console.log('2', chunkKey);
    return [
      this.getNorthChunk(chunkKey),
      this.getNorthEastChunk(chunkKey),
      this.getEastChunk(chunkKey),
      this.getSouthEastChunk(chunkKey),
      this.getSouthChunk(chunkKey),
      this.getSouthWestChunk(chunkKey),
      this.getWestChunk(chunkKey),
      this.getNorthWestChunk(chunkKey),
    ];
  }

  getNeighborhood(chunk) {
    // the neighborhood is just chunk's neighbors plus chunk
    console.log('3 chunk', chunk);
    const neighborhood = this.getNeighbors(chunk);
    neighborhood.push(chunk);
    return neighborhood;
  }

  getNorthChunk(chunkKey) {
    return this.getChunk(this.getNorthChunkKey(chunkKey));
  }

  getEastChunk(chunkKey) {
    return this.getChunk(this.getEastChunkKey(chunkKey));
  }
  getSouthChunk(chunkKey) {
    return this.getChunk(this.getSouthChunkKey(chunkKey));
  }

  getWestChunk(chunkKey) {
    return this.getChunk(this.getWestChunkKey(chunkKey));
  }

  getNorthEastChunk(chunkKey) {
    return this.getChunk(this.getNorthEastChunkKey(chunkKey));
  }
  getSouthEastChunk(chunkKey) {
    return this.getChunk(this.getSouthEastChunkKey(chunkKey));
  }

  getSouthWestChunk(chunkKey) {
    return this.getChunk(this.getSouthWestChunkKey(chunkKey));
  }

  getNorthWestChunk(chunkKey) {
    return this.getChunk(this.getNorthWestKey(chunkKey));
  }

  getNorthChunkKey(chunkKey) {
    let chunkKeyTuple = [];
    console.log(chunkKey);
    let chunkKeyStrTuple = chunkKey.split(',');
    for (const s of chunkKeyStrTuple) {
      chunkKeyTuple.push(Number(s));
    }
    return chunkKey[0], chunkKey[1] - 1;
  }

  getEastChunkKey(chunkKey) {
    return chunkKey[0] + 1, chunkKey[1];
  }

  getSouthChunkKey(chunkKey) {
    return chunkKey[0], chunkKey[1] + 1;
  }

  getWestChunkKey(chunkKey) {
    return chunkKey[0] - 1, chunkKey[1];
  }

  getNorthEastChunkKey(chunkKey) {
    return chunkKey[0] + 1, chunkKey[1] - 1;
  }

  getSouthEastChunkKey(chunkKey) {
    return chunkKey[0] + 1, chunkKey[1] + 1;
  }

  getSouthWestChunkKey(chunkKey) {
    return chunkKey[0] - 1, chunkKey[1] + 1;
  }

  getNorthWestChunkKey(chunkKey) {
    return chunkKey[0] - 1, chunkKey[1] - 1;
  }

  getChunk(chunkKey) {
    if (chunkKey in this.chunks) {
      return this.chunks[chunkKey];
    }
    // we could put `else` here, but that would be redundant
    return null;
  }

  getEntityChunk(entity) {
    console.log('4', entity);
    const chunkKey = this.entityChunkKey[entity];
    return this.chunks[chunkKey];
  }
}

export default ChunkSystem;
