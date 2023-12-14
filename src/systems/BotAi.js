import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';
import BaseAi from './BaseAi';

class BotAi extends BaseAi {
  updateAll() {
    for (const bot of this.bots) {
      this.update(bot);
    }
  }

  update(bot) {
    if (Math.random() > 0.1) {
      return;
    }
    const closest = this.getClosest(bot, this.zombies);
    if (closest) {
      this.setDirectionAwayFrom(bot, closest);
    } else {
      this.jiggle(bot);
    }
  }
}

export default BotAi;
