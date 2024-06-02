function Animal(
  name,
  species,
  weight,
  legs,
  hasScales,
  flies,
  hasHair,
  breathsUnderWater
) {
  this.name = name;
  this.species = species;
  this.weight = weight;
  this.legs = legs;
  this.hasScales = hasScales;
  this.flies = flies;
  this.hasHair = hasHair;
  this.breathsUnderWater = breathsUnderWater;
}

// The builder constructor receives only the mandatory attributes (name and species)
function AnimalBuilder(name, species) {
  this.name = name;
  this.species = species;

  this.setWeight = function (weigth) {
    this.weight = weigth;
    return this;
  };

  this.setLegs = function (legs) {
    this.legs = legs;
    return this;
  };

  this.setHasScales = function (hasScales) {
    this.hasScales = hasScales;
    return this;
  };

  this.setFlies = function (flies) {
    this.flies = flies;
    return this;
  };

  this.setHasHair = function (hasHair) {
    this.hasHair = hasHair;
    return this;
  };

  this.setBreathsUnderWater = function (breathsUnderWater) {
    this.breathsUnderWater = breathsUnderWater;
    return this;
  };

  this.build = function () {
    return new Animal(
      this.name,
      this.species,
      this.weight,
      this.legs,
      this.hasScales,
      this.flies,
      this.hasHair,
      this.breathsUnderWater
    );
  };
}

// The adventage of the builder pattern is that you don't have specify all of the class attributes.
// You only need to specify the attributes you want to set.

const animalTom = new AnimalBuilder("Tom", "fish")
  .setWeight(2)
  .setHasScales(true)
  .setBreathsUnderWater(true)
  .build();
console.log(animalTom);

const animalCherry = new AnimalBuilder("Cherry", "cow")
  .setWeight(200)
  .setLegs(4)
  .setHasHair(true)
  .build();
console.log(animalCherry);

const animalJack = new AnimalBuilder("Jack", "lizard")
  .setWeight(0.15)
  .setLegs(4)
  .setHasScales(true)
  .build();
console.log(animalJack);
