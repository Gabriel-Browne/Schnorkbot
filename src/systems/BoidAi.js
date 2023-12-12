import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';
import BaseAi from './BaseAi';

const WEIGHTS = { separation: 0.4, alignment: 0.3, cohesion: 0.3 };
const RADIUS = 100;
const SEPARATION_RADIUS = 20;

class BoidAi extends BaseAi {
  updateAll() {
    for (const boid of this.boids) {
      this.update(boid);
    }
  }

  update(boid) {
    // separation
    //     boids move away from other boids that are too close
    // alignment
    //     boids try to match velocity with other boids
    // cohesion
    //     boids try to stay close to each other
    const neighbors = this.getBoidsInRadius(boid, RADIUS);
    const currentDirection = boid.movementComponent.direction;
    console.log(currentDirection);
    let separationDirection =
      this.separation(boid, neighbors) || currentDirection;
    let alignmentDirection =
      this.alignment(boid, neighbors) || currentDirection;
    let cohesionDirection = this.cohesion(boid, neighbors) || currentDirection;

    console.log(separationDirection, alignmentDirection, cohesionDirection);
    const velocity = {
      x:
        separationDirection.x * WEIGHTS.separation +
        alignmentDirection.x * WEIGHTS.alignment +
        cohesionDirection.x * WEIGHTS.cohesion,
      y:
        separationDirection.y * WEIGHTS.separation +
        alignmentDirection.y * WEIGHTS.alignment +
        cohesionDirection.y * WEIGHTS.cohesion,
    };
    console.log(velocity);
    if (!(velocity.x instanceof Number) || !(velocity.y instanceof Number)) {
      return;
    }
    this.setMovementTowards(boid, velocity);
  }

  separation(boid, neighbors) {
    // boids move away from other boids that are too close
    if (neighbors.length === 0) {
      return;
    }
    const closest = this.getClosest(boid, neighbors);
    if (this.getDistance(boid, closest) < SEPARATION_RADIUS) {
      const direction = this.getDirectionVector(boid, closest);
      return { x: -direction.x, y: -direction.y };
    }
  }
  alignment(boid, neighbors) {
    if (neighbors.length === 0) {
      return;
    }
    // a dictionary mapping neighbors to their distances
    const distances = {};
    for (const neighbor of neighbors) {
      distances[neighbor] = this.getDistance(boid, neighbor);
    }
    const normalizedDistances = this.normalizeDictionary(distances);
    const velocity = { x: 0, y: 0 };
    for (const neighbor of neighbors) {
      const direction = this.getDirectionVector(boid, neighbor);
      velocity.x += direction.x * normalizedDistances[neighbor];
      velocity.y += direction.y * normalizedDistances[neighbor];
    }
    return velocity;
  }

  normalizeDictionary(dictionary) {
    const total = Object.values(dictionary).reduce(
      (total, value) => total + value,
      0
    );
    const normalized = {};
    for (const key in dictionary) {
      normalized[key] = dictionary[key] / total;
    }
    return normalized;
  }
  cohesion(boid, neighbors) {
    if (neighbors.length === 0) {
      return;
    }
    const center = this.getCenter(neighbors);
    const direction = this.getDirectionVector(boid, center);
    return direction;
  }

  getCenter(boids) {
    const center = { x: 0, y: 0 };
    for (const boid of boids) {
      center.x += boid.positionComponent.x;
      center.y += boid.positionComponent.y;
    }
    center.x /= boids.length;
    center.y /= boids.length;
    return center;
  }

  getBoidsInRadius(boid, radius) {
    let boidsInRadius = [];
    for (const b of this.boids) {
      const distance = this.getDistance(boid, b);
      if (distance < radius) {
        boidsInRadius.push(b);
      }
    }
    return boidsInRadius;
  }
}

export default BoidAi;
