class Energy {
    // when we are in here, we are defining class-specific,
    // not instance specific variables.
    // we can refer to them using the `this` keyword AS IF they are instance-specific,
    // or we can refer to them with Energy.MIN_ENERGY or Energy.MAX_ENERGY
    // note we can NOT use Energy.energy, since this is only defined when we construct an instance!
    MIN_ENERGY = 0;
    MAX_ENERGY = 100;
    
    constructor(this, energy) {
        this.energy = energy;
    }

    hasEnergy() {
        // returns true if we have more energy than min energy, false otherwise
        return this.energy > this.MIN_ENERGY;
    }


    
}
export default Energy;

// the constructor is called when you instantiate a new instance (aka an object) of a class
// const energy = new Energy()
// if the constructor takes parameters, we pass them in there^
// const startingEnergy = 50
// const energy = new Energy(50)

// the constructor is where we set properties that are specific to the instance of the class.
// these are stored variables

// "this" means "my"
// const energyInstance = new Energy()
// energyInstance.value ==> this.value (from the perspective of our object which we called energy)



// // by convention, class definitions are capitalized
// class Dog { 
//     constructor(name) {
//         this.name = name;
//     }
// }

// // create a new Dog object and assign it to local variable, zuni
// const zuni = new Dog("Zuni") // this calls the constructor

// console.log(zuni.name) // this will print "Zuni"