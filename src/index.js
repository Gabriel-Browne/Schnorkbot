import * as PIXI from 'pixi.js';

import Zombie from './entities/Zombie.js';
import Bot from './entities/Bot.js';
import MovementSystem from './systems/MovementSystem.js';
import RenderSystem from './systems/RenderSystem.js';
import ZombieAi from './systems/ZombieAi.js';
import BotAi from './systems/BotAi.js';
import ChunkSystem from './systems/ChunkSystem.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});

const NUM_ZOMBIES = 10;
const NUM_BOTS = 10;

document.body.appendChild(app.view);

const entities = [];
const movementSystem = new MovementSystem(app.view.width, app.view.height);
const chunkSystem = new ChunkSystem(5);

for (let i = 0; i < NUM_ZOMBIES; i++) {
  addZombie();
}

for (let i = 0; i < NUM_BOTS; i++) {
  addBot();
}

const zombieAi = new ZombieAi(entities);
const botAi = new BotAi(entities);

function gameLoop() {
  zombieAi.updateAll();
  botAi.updateAll();
  movementSystem.updateAll(entities);
  RenderSystem.updateAll(entities);
  chunkSystem.updateAll(entities);

  app.renderer.render(app.stage);
  requestAnimationFrame(gameLoop);
}

gameLoop();

function addZombie() {
  const zombie = new Zombie(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entities.push(zombie);
  app.stage.addChild(zombie.sprite);
}

function addBot() {
  const bot = new Bot(
    app.view.width * Math.random(),
    app.view.height * Math.random()
  );
  entities.push(bot);
  app.stage.addChild(bot.sprite);
}
