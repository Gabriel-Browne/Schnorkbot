import CollisionComponent from '../components/CollisionComponent.js';
import PositionComponent from '../components/PositionComponent.js';

class SquareCollisionComponent extends CollisionComponent {
  constructor(position, length) {
    super(position);
    // this calls the constructor of CollisionComponent
    // for now, this just adds the `center` property
    const x = position.x;
    const y = position.y;
    // we should also be able to do `const x = this.center.x`
    // if we were being really anal, we could write a test for that here.
    this.topY = y - length / 2;
    this.bottomY = y + length / 2;
    this.leftX = x - length / 2;
    this.rightX = x + length / 2;

    this.vertices = this.getVertices();
  }

  contains(position) {
    // console.info(position);
    const x = position.x;
    const y = position.y;
    return (
      y > this.topY && y < this.bottomY && x > this.leftX && x < this.rightX
    );
  }

  getVertices() {
    return [
      new PositionComponent(this.leftX, this.topY),
      new PositionComponent(this.rightX, this.topY),
      new PositionComponent(this.rightX, this.bottomY),
      new PositionComponent(this.leftX, this.bottomY),
    ];
  }
}

export default SquareCollisionComponent;
