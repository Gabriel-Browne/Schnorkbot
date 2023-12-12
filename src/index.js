import * as PIXI from 'pixi.js';

import Zombie from './entities/Zombie.js';
import Bot from './entities/Bot.js';
import EntityManager from './utils/EntityManager.js';
import MovementSystem from './systems/MovementSystem.js';
import RenderSystem from './systems/RenderSystem.js';
import ZombieAi from './systems/ZombieAi.js';
import BotAi from './systems/BotAi.js';
import Boid from './entities/Boid.js';
import BoidAi from './systems/BoidAi.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});

const NUM_ZOMBIES = 1;
const NUM_BOTS = 1;
const NUM_BOIDS = 10;

document.body.appendChild(app.view);

const entityManager = new EntityManager();
const movementSystem = new MovementSystem(app.view.width, app.view.height);

for (let i = 0; i < NUM_ZOMBIES; i++) {
  addZombie();
}

for (let i = 0; i < NUM_BOTS; i++) {
  addBot();
}

for (let i = 0; i < NUM_BOIDS; i++) {
  addBoid();
}

const zombieAi = new ZombieAi(entityManager.entities);
const botAi = new BotAi(entityManager.entities);
const boidAi = new BoidAi(entityManager.entities);

function gameLoop() {
  zombieAi.updateAll();
  botAi.updateAll();
  boidAi.updateAll();
  movementSystem.updateAll(entityManager.entities);
  RenderSystem.updateAll(entityManager.entities);

  app.renderer.render(app.stage);
  requestAnimationFrame(gameLoop);
}

gameLoop();

function addZombie() {
  const zombie = new Zombie(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entityManager.addEntity(zombie);
  app.stage.addChild(zombie.sprite);
}

function addBot() {
  const bot = new Bot(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entityManager.addEntity(bot);
  app.stage.addChild(bot.sprite);
}

function addBoid() {
  const boid = new Boid(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entityManager.addEntity(boid);
  app.stage.addChild(boid.sprite);
}
