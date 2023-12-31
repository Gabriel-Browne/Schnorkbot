class Chunk {
  constructor(row, col, entities = []) {
    this.row = row;
    this.col = col;
    this.entities = new Set(entities);
  }

  containsEntity(entity) {
    return entity in this.entities;
  }

  addEntity(entity) {
    this.entities.add(entity);
  }

  deleteEntity(entity) {
    this.entities.delete(entity);
  }

  hash() {
    return this.row, this.col;
  }
}
export default Chunk;
