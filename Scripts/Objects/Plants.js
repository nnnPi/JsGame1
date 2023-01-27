//plant related

// map plant to a digit used in main loop event listener keydown

const planttodigit = {
  Digit1: plantData.weed,
  Digit2: plantData.potato,
  Digit3: plantData.carrot,
  Digit4: plantData.garlic,
  Digit5: plantData.wheat,
  Digit6: plantData.strawberry,
};

// class Plant, receive definition in main loop event listener keydown,
// then put it in array plant[] to be used by growP and drawP function
let plant = [];

class Plant {
  constructor(x, y, PlantDefinition) {
    this.x = x;
    this.y = y;
    this.spx = 0;
    this.spy = 0;
    this.height = PlantDefinition.height;
    this.width = PlantDefinition.width;
    this.birth = gameFrame;
    this.age = 0;
    this.image = new Image();
    this.image.src = PlantDefinition.imgsource;
    this.stage = 0;
    this.maxstage = PlantDefinition.maxstage;
    this.basegrowtime = PlantDefinition.growTime;
    this.spriteYRow = PlantDefinition.spriteYRow;
  }

  growP() {
    // age is number of frame after birth, divided by ( growtime/maxstage)
    // ex : growtime 1000, 5 stage
    //  when age increment by 200, increase stage by 1, unless it has reache max stage already
    // then use current stage * sprite width to navigate horizontaly the sheet accordingly

    this.age = gameFrame - this.birth;
    this.stage = Math.floor(this.age / (this.basegrowtime / this.maxstage));
    if (this.stage > this.maxstage) {
      this.stage = this.maxstage;
    }
    this.spx = this.stage * this.width;
  }

  drawP() {
    ctx.drawImage(
      this.image,
      this.spx,
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
