//Temporary
// map animal to a digit used in main loop event listener keydown
const animaltodigit = {
  F1: AnimalData.chicken,
  F2: AnimalData.duck,
  F3: AnimalData.lizard,
  F4: AnimalData.sheep,
  F5: AnimalData.pig,
  F6: AnimalData.rabbit,
  F7: AnimalData.cat,
  F8: AnimalData.smolworm,
  F9: AnimalData.ant,
  F10: AnimalData.mouseanimal,
};

// more permanent
// class Animal, receive definition in main loop event listener keydown,
// then put it in array animal[] to be used by updateA and drawA function

//Make sure the array exist at loading time
let animal = [];

//Define class Animal
class Animal {
  constructor(x, y, charOrientation, AnimalDefinition) {
    this.x = x;
    this.y = y;
    this.height = AnimalDefinition.height;
    this.width = AnimalDefinition.width;
    this.birth = gameFrame;
    this.image = new Image();
    this.image.src = AnimalDefinition.imgsource;
    this.specie = AnimalDefinition.specie;
    this.age = 0;
    this.spx = 0;
    this.spy = 0;
    this.noise = AnimalDefinition.noise;
    this.spriteXmax = AnimalDefinition.spriteXmax;
    this.state = "idle";
    if (AnimalDefinition.baseanimationspeed == undefined) {
      this.baseanimationspeed = 10;
    } else {
      this.baseanimationspeed = AnimalDefinition.baseanimationspeed;
    }

    // logic used when placing animal with hotkey
    // make animal face same direction as character when placed and offset relative to char so it is placed in front

    if (charOrientation == "North") {
      this.spriteYRow = 3;
      this.y = y - this.height * 2;
      this.orientation = "North";
    }
    if (charOrientation == "South") {
      this.spriteYRow = 0;
      this.y = y + this.height;
      this.orientation = "South";
    }
    if (charOrientation == "East") {
      this.spriteYRow = 2;
      this.x = x + this.width;
      this.orientation = "East";
    }
    if (charOrientation == "West") {
      this.spriteYRow = 1;
      this.x = x - this.width * 2;
      this.orientation = "West";
    }
  }

  // Animal  default behavior (should be called idle )

  updateA() {
    if (this.specie === "cat") {
      catupdate(this);
    } else if (this.specie === "lizard") {
      lizardupdate(this);
    } else if (this.specie === "pig") {
      pigupdate(this);
    } else genericupdate(this);
  }

  drawA() {
    ctx.drawImage(
      this.image,
      this.spx * this.width,
      this.spriteYRow * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

function moveleg(animal) {
  if (animal.currentanimationspeed) {
    if (animal.age % animal.currentanimationspeed === 0) {
      if (animal.spx < animal.spriteXmax) {
        animal.spx += 1;
      } else {
        animal.spx = 0;
      }
    }
  } else {
    if (animal.age % animal.baseanimationspeed === 0) {
      if (animal.spx < animal.spriteXmax) {
        animal.spx += 1;
      } else {
        animal.spx = 0;
      }
    }
  }
}
