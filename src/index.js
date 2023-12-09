import * as PIXI from 'pixi.js';

import Zombie from './entities/Zombie.js';
import EntityManager from './utils/EntityManager.js';
import MovementSystem from './systems/MovementSystem.js';
import RenderSystem from './systems/RenderSystem.js';
import CollisionSystem from './systems/CollisionSystem.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});

const NUM_ZOMBIES = 5;
const DIRECTION_CHANGE_MAGNITUDE = 0.1;

document.body.appendChild(app.view);

const entityManager = new EntityManager();
const movementSystem = new MovementSystem(app.view.width, app.view.height);
const collisionSystem = new CollisionSystem();

for (let i = 0; i < NUM_ZOMBIES; i++) {
  const zombie = new Zombie(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entityManager.addEntity(zombie);
  app.stage.addChild(zombie.sprite);
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
    const currDirection = entity.movement.getDirection();
    const newDirection = nudgeDirectionRandomly(currDirection);
    entity.movement.setDirection(newDirection.x, newDirection.y);
    movementSystem.update(entity);
    RenderSystem.update(entity);
  }
  collisionSystem.update(entityManager.entities);

  app.renderer.render(app.stage);
  requestAnimationFrame(gameLoop);
}

gameLoop();
