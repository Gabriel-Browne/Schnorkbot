class PositionComponent {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

export default PositionComponent;
