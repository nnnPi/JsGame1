// Chicken sound noise file list
const ChickenSoundlist = [
  "Sounds/chicken/chicken1.mp3",
  "Sounds/chicken/chicken2.mp3",
  "Sounds/chicken/chicken3.mp3",
  "Sounds/chicken/chicken4.mp3",
  "Sounds/chicken/chicken5.mp3",
  "Sounds/chicken/chicken6.mp3",
  "Sounds/chicken/chicken7.mp3",
  "Sounds/chicken/chicken8.mp3",
  "Sounds/chicken/chicken9.mp3",
  "Sounds/chicken/chicken10.mp3",
  "Sounds/chicken/chicken11.mp3",
  "Sounds/chicken/chicken12.mp3",
  "Sounds/chicken/chicken13.mp3",
  "Sounds/chicken/chicken14.mp3",
  "Sounds/chicken/chicken15.mp3",
];

// chickennoise array storing each sound as audio
// need to be loaded before class Animals
// is part of Animaldefinition
let chickennoise = [];
ChickenSoundlist.forEach((element) => {
  chickennoise.push(new Audio(element));
});

// Duck sound noise file list
const DuckSoundlist = [
  "Sounds/duck/duck1.mp3",
  "Sounds/duck/duck2.mp3",
  "Sounds/duck/duck3.mp3",
  "Sounds/duck/duck4.mp3",
  "Sounds/duck/duck5.mp3",
  "Sounds/duck/duck6.mp3",
  "Sounds/duck/duck7.mp3",
  "Sounds/duck/duck8.mp3",
];

// ducknoise array storing each sound as audio
// need to be loaded before class Animals
// is part of Animaldefinition
let ducknoise = [];
DuckSoundlist.forEach((element) => {
  ducknoise.push(new Audio(element));
});

const AnimalData = {
  chicken: {
    specie: "chicken", // name of the animal
    imgsource: "Images/Animal/Chicken.png", // image source
    spriteXmax: 2, // starting with 0, number of column for sprite sheet 2 means 3 column
    spriteYRow: 0, // initial orientation need to exist, is reset when animal placed
    height: 32, //  height of the sprite for 1 image
    width: 32, // width of the sprite for 1 image
    state: "idle", // default state not used atm
    noise: chickennoise, // array containing sound, definition need to come after array is filled /!\
  },

  duck: {
    specie: "duck",
    imgsource: "Images/Animal/Duck.png",
    spriteXmax: 2,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
    noise: ducknoise,
  },

  lizard: {
    specie: "lizard",
    imgsource: "Images/Animal/Lizard.png",
    spriteXmax: 3,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
    baseanimationspeed: 5,
  },

  pig: {
    specie: "pig",
    imgsource: "Images/Animal/Pig.png",
    spriteXmax: 2,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
    baseanimationspeed: 15,
  },

  sheep: {
    specie: "sheep",
    imgsource: "Images/Animal/Sheep.png",
    spriteXmax: 2,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
    baseanimationspeed: 15,
  },

  rabbit: {
    specie: "rabbit",
    imgsource: "Images/Animal/Rabbit.png",
    spriteXmax: 2,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
  },

  cat: {
    specie: "cat",
    imgsource: "Images/Animal/Cat.png",
    spriteXmax: 2,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
  },

  smolworm: {
    specie: "smolworm",
    imgsource: "Images/Animal/SmolWorm.png",
    spriteXmax: 3,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
  },

  ant: {
    specie: "ant",
    imgsource: "Images/Animal/Ant.png",
    spriteXmax: 3,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
    baseanimationspeed: 3,
  },

  mouseanimal: {
    specie: "mouse",
    imgsource: "Images/Animal/Mouse.png",
    spriteXmax: 2,
    spriteYRow: 0,
    height: 32,
    width: 32,
    state: "idle",
  },
};
