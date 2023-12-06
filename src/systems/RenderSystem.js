class RenderSystem {
  static update(entity) {
    const position = entity.positionComponent;

    entity.sprite.x = position.x;
    entity.sprite.y = position.y;
  }
}

export default RenderSystem;
