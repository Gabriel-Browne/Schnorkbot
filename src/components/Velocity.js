class Velocity {
  constructor(speed = 1) {
    this.speed = speed;
    this.direction = { x: 0, y: 0 };
  }

  setDirection(x, y) {
    this.direction.x = x;
    this.direction.y = y;
    this.normalizeDirection();
  }

  normalizeDirection() {
    // Pythagorean theorem baby!
    const magnitude = Math.sqrt(
      this.direction.x * this.direction.x + this.direction.y * this.direction.y
    );
    this.direction.x /= magnitude;
    this.direction.y /= magnitude;
  }

  getDirection() {
    return { x: this.direction.x, y: this.direction.y };
  }
}

export default Velocity;
