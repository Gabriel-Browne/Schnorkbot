import Zombie from '../entities/Zombie';
import Bot from '../entities/Bot';
import BaseAi from './BaseAi';

const WEIGHTS = { separation: 0.55, alignment: 0.55, cohesion: 0.55 };
const RADIUS = 80;
const SEPARATION_RADIUS = 10;

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

    let separationDirection = this.separation(boid, neighbors);
    let alignmentDirection = this.alignment(boid, neighbors);
    let cohesionDirection = this.cohesion(boid, neighbors);

    // console.log(separationDirection, alignmentDirection, cohesionDirection);

    if (this.getDistanceToClosestWall(boid) < 50) {
      this.jiggleMovement(boid, 1);
      return;
    }

    if (!separationDirection && !alignmentDirection && !cohesionDirection) {
      this.jiggleMovement(boid);
      return;
    }

    // console.log(this.getDistanceToClosestWall(boid))

    const velocity = { x: 0, y: 0 };
    if (separationDirection) {
      velocity.x += separationDirection.x * WEIGHTS.separation;
      velocity.y += separationDirection.y * WEIGHTS.separation;
    }
    if (alignmentDirection) {
      velocity.x += alignmentDirection.x * WEIGHTS.alignment;
      velocity.y += alignmentDirection.y * WEIGHTS.alignment;
    }
    if (cohesionDirection) {
      velocity.x += cohesionDirection.x * WEIGHTS.cohesion;
      velocity.y += cohesionDirection.y * WEIGHTS.cohesion;
    }
    this.setDirection(boid, velocity);
    this.jiggleMovement(boid);
    return;
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
    const normalizedDistances = this.getNormalizedDistances(boid, neighbors);

    const velocity = { x: 0, y: 0 };
    // const velocity = boid.movementComponent.direction;
    for (const neighbor of neighbors) {
      // const direction = this.getDirectionVector(boid, neighbor);
      const direction = neighbor.movementComponent.direction;
      velocity.x += direction.x * normalizedDistances[neighbor];
      velocity.y += direction.y * normalizedDistances[neighbor];
    }
    return velocity;
  }

  cohesion(boid, neighbors) {
    if (neighbors.length === 0) {
      return;
    }
    const center = this.getCenter(neighbors);
    const direction = this.getDirectionVector(boid, center);
    return direction;
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

  getDistances(boid, others) {
    const distances = {};
    for (const other of others) {
      distances[other] = this.getDistance(boid, other);
    }
    return distances;
  }

  getNormalizedDistances(boid, others) {
    const distances = this.getDistances(boid, others);
    return this.normalizeDictionary(distances);
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

  getCurrentDirection(boidOrMovement) {
    const movement = boidOrMovement.movementComponent
      ? boidOrMovement.movementComponent
      : boid;
    return movement.direction;
  }

  getBoidsInRadius(boid, radius) {
    let boidsInRadius = [];
    for (const b of this.boids) {
      if (b === boid) {
        continue;
      }
      const distance = this.getDistance(boid, b);
      if (distance < radius) {
        boidsInRadius.push(b);
      }
    }
    return boidsInRadius;
  }
}

export default BoidAi;
