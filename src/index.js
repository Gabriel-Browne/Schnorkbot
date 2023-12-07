import * as PIXI from 'pixi.js';

import Zombie from './entities/Zombie.js';
import EntityManager from './utils/EntityManager.js';
import MovementSystem from './systems/MovementSystem.js';
import RenderSystem from './systems/RenderSystem.js';
import Protagonist from './entities/Protaganist.js';

// set up the PIXI app
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});

// some constant values
const NUM_ZOMBIES = 1;
const NUM_PROTAGONISTS = 5;
const DIRECTION_CHANGE_MAGNITUDE = 0.1;

document.body.appendChild(app.view);

const entityManager = new EntityManager();
const movementSystem = new MovementSystem(app.view.width, app.view.height);

// creates NUM_ZOMBIES zombies
for (let i = 0; i < NUM_ZOMBIES; i++) {
  const zombie = new Zombie(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entityManager.addEntity(zombie);
  app.stage.addChild(zombie.sprite); //sprite is a visual representation of a character
}

// creates NUM_PROTAGONISTS protagonists
for (let i = 0; i < NUM_PROTAGONISTS; i++) {
  // creates an instance of the Protagonist class
  // with a random x and y position
  const protagonist = new Protagonist(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entityManager.addEntity(protagonist);
  app.stage.addChild(protagonist.sprite); //sprite is a visual representation of a character

  // Math.random() returns a random number between 0 and 1
}

// helper function that takes in a direction (with x and y component) and outputs that direction with a "random nudge"
function nudgeDirectionRandomly(direction) {
  const randomA = DIRECTION_CHANGE_MAGNITUDE * (Math.random() * 2 - 1);
  const randomB = DIRECTION_CHANGE_MAGNITUDE * (Math.random() * 2 - 1);

  return {
    x: direction.x + randomA,
    y: direction.y + randomB,
  };
}

function gameLoop() {
  for (const entity of entityManager.entities) {
    const currDirection = entity.movementComponent.getDirection();
    const newDirection = nudgeDirectionRandomly(currDirection);
    entity.movementComponent.setDirection(newDirection.x, newDirection.y);

    movementSystem.update(entity);
    RenderSystem.update(entity);
  }

  app.renderer.render(app.stage);
  requestAnimationFrame(gameLoop);
}
// run the game loop
gameLoop();
