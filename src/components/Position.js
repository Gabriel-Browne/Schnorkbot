class Position {
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

  getDistance(position) {
    return Math.sqrt(
      Math.pow(this.x - position.x, 2) + Math.pow(this.y - position.y, 2)
    );
  }
}

export default Position;
