import * as PIXI from 'pixi.js';
// import path from 'path';
// import fs from 'fs';

import PositionComponent from '../components/PositionComponent.js';
const PROTAGONIST_SPEED = 4;

// const assetsFolderPath = path.join(__dirname, '../../assets');

class Protagonist {
  constructor(x, y) {
    this.positionComponent = new PositionComponent(x, y);
    this.movementComponent = new MovementComponent(PROTAGONIST_SPEED);

    this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    // this.sprite = PIXI.Sprite.from(`${assetsFolderPath}/schnork.jpeg`);

    // console log the contents of the directory assetsFolderPath
    // console.log(fs.readdirSync(assetsFolderPath));

    if (!this.sprite.texture.valid) {
      console.error('Texture failed to load');
    }

    this.sprite.anchor.set(0.5); // center the sprite's anchor point (for PIXI js)
    this.sprite.position.set(x, y);
  }
}

export default Protagonist;
