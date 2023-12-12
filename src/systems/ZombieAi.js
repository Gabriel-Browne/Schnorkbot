import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';
import BaseAi from './BaseAi';

class ZombieAi extends BaseAi {
  updateAll() {
    for (const zombie of this.zombies) {
      this.update(zombie);
    }
  }

  update(zombie) {
    if (Math.random() > 0.1) {
      return;
    }
    const closest = this.getClosest(zombie, this.bots);
    if (closest) {
      this.setMovementTowards(zombie, closest);
    } else {
      this.jiggleMovement(zombie);
    }
  }
}

export default ZombieAi;
