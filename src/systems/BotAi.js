import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';
import BaseAi from './BaseAi';

const DIST_TO_ACCELERATE = 50;
const DIST_TO_DECELERATE = 300;
const ACCELERATION_AMOUNT = 0.3;
const PROB_NO_CHANGE = 0.7

// position(t+1) = position(t) + velocity(t)
// velocity(t+1) = velocity(t) + acceleration(t)

// accelerate(howMuch) {
//   this.speed += howMuch
// }

// decelerate(howMuch) {
    // return this.accelerate(-howMuch)
// }


class BotAi extends BaseAi {
  
  updateAll() {
    for (const bot of this.bots) {
      this.update(bot);
    }
  }

  // velocity = velocity + acceleration
  
  update(bot) {
    // 90% of the time, we don't change anything and exit
    if (Math.random() < PROB_NO_CHANGE) {
      return;
    }
    // 10% of the time,
    // we first, find the closest zombie to me
    const closest = this.getClosest(bot, this.zombies);
    // if there is a closest zombie
    // this checks if closest is null. which shouldn't really happen (unless there are no zombies)
    if (closest) {
      this.setDirectionAwayFrom(bot, closest);
      // find how far away the closest zombie is

      const distanceToClosest = this.getDistance(bot, closest);
      if (distanceToClosest<DIST_TO_ACCELERATE){
        // then accelerate
        bot.velocity.accelerate(ACCELERATION_AMOUNT);
      }
      else if (distanceToClosest>DIST_TO_DECELERATE) {
        bot.velocity.decelerate(ACCELERATION_AMOUNT);
      }


    } else {
      // 
      this.jiggle(bot);
    }
  }
}

export default BotAi;
