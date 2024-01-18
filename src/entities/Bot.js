import * as PIXI from 'pixi.js';

// importing the components used by the entity
// here we use their relative path in relation to this program file, hence '../components/'
import Position from '../components/Position.js';
import Velocity from '../components/Velocity.js';


// in the "entity-component-system architecture" the entity is just a collection of components.
// we don't define any logic here, we just define the data that makes up the entity.
class Bot {
  // by convention, constants are all uppercase
  MIN_SPEED = .125;
  MAX_SPEED = 6;
  INIT_SPEED = 2;
  
  constructor(x, y) {
    // instantiate the position component with the provided x and y coordinates
    // we use the 'new' keyword to create a new instance of the Position class
    this.position = new Position(x, y);
    this.velocity = new Velocity(this.INIT_SPEED, this.MIN_SPEED, this.MAX_SPEED);

    // 'this' refers to the current instance of the class
    // its like saying "my"

    // some day we might define a sprite component that would allow us to do all of this in one line
    // but this way is fine for now
    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    // change color to green
    this.sprite.tint = 0x0fff00;
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(x, y);
  }
}

export default Bot;
