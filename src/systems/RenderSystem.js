class RenderSystem {
  static updateAll(entities) {
    for (const entity of entities) {
      RenderSystem.update(entity);
    }
  }

  static update(entity) {
    const position = entity.positionComponent;

    entity.sprite.x = position.x;
    entity.sprite.y = position.y;
  }
}

export default RenderSystem;
