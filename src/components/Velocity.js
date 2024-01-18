class Velocity {

  // if initialSpeed is not specified, we assign it to the default value of 1
  // if it is specified, we ignore this default value
  constructor(initialSpeed = 1, minSpeed=0, maxSpeed=1) {
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.speed = initialSpeed;


    // this.direction is a "Map" (or 'Dictionary')
    // maps a key to a value

    // an array is kind of a like a map, but the "key" would be the index,
    // and the value would be the value.

    // a map can map any "hashable" type to a value/

    // this.direction["x"] // this would be 0
    // const array = [1,2,3]
    // array[0] // this would be 1

    // this.direction.x === this.direction["x"]
    this.direction = { x: 0, y: 0 };
  }

  // example usage: velocityComponent.setDirection(2, 5)
  setDirection(x, y) {
    // set the "x" part of this.direction to the value passed in
    this.direction.x = x;
    // same for y
    this.direction.y = y;
    this.normalizeDirection();
  }

  // technically this should take a velocity vector as input.
  // for now lets just assume we keep direction constant.
  // could be a good thing to refactor
  accelerate(amount) {
    this.setSpeed(this.speed + amount)
  }

  decelerate(amount) {
    //thanks to Ms. Comstock, decelerating is just accelerating in the opposite direction
    this.accelerate(-amount);
  }

  setSpeed(newSpeed) {
    if (newSpeed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    } else if (newSpeed < this.minSpeed) {
      this.speed = this.minSpeed;
    } else {
      this.speed = newSpeed
    }
  }

  getAngle() {
    return Math.atan2(this.direction.y, this.direction.x);
  }

  normalizeDirection() {
    // Pythagorean theorem baby!
    const magnitude = Math.sqrt(
      this.direction.x * this.direction.x + this.direction.y * this.direction.y
    );

    // if we try to divide by 0, we will have issues!
    // so if that happens, just dont mess with it
    if (magnitude == 0) return
    
    this.direction.x /= magnitude;
    this.direction.y /= magnitude;
  }

  getVector() {
    return {x: this.direction.x * this.speed, y: this.direction.y * this.speed }
  }

  getDirection() {
    return { x: this.direction.x, y: this.direction.y };
  }
}

export default Velocity;
