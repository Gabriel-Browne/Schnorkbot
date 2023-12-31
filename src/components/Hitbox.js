import Position from '../components/Position.js';

class Hitbox {
  constructor(position, length) {
    const x = position.x;
    const y = position.y;
    // we should also be able to do `const x = this.center.x`
    // if we were being really anal, we could write a test for that here.
    this.topY = y - length / 2;
    this.bottomY = y + length / 2;
    this.leftX = x - length / 2;
    this.rightX = x + length / 2;

    // this.vertices = this.getVertices();
  }

  contains(position) {
    // if (Math.random() < 0.1) {
    //   console.log(position);
    // }

    const x = position.x;
    const y = position.y;
    return (
      y > this.topY && y < this.bottomY && x > this.leftX && x < this.rightX
    );
  }

  // getVertices() {
  //   return [
  //     new Position(this.leftX, this.topY),
  //     new Position(this.rightX, this.topY),
  //     new Position(this.rightX, this.bottomY),
  //     new Position(this.leftX, this.bottomY),
  //   ];
  // }
}

export default Hitbox;
