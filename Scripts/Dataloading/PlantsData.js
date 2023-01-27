// Shovel sound noise

const ShovelSoundlist = [
  "Sounds/shovel/shovel1.mp3",
  "Sounds/shovel/shovel2.mp3",
  "Sounds/shovel/shovel3.mp3",
  "Sounds/shovel/shovel4.mp3",
  "Sounds/shovel/shovel5.mp3",
  "Sounds/shovel/shovel6.mp3",
  "Sounds/shovel/shovel7.mp3",
  "Sounds/shovel/shovel8.mp3",
  "Sounds/shovel/shovel9.mp3",
];

let shovelnoise = [];
ShovelSoundlist.forEach((element) => {
  shovelnoise.push(new Audio(element));
});

const plantData = {
  weed: {
    imgsource: "Images/Plant.png",
    spriteYRow: 0,
    height: 32,
    width: 16,
    growTime: 500,
    maxstage: 5,
  },

  potato: {
    imgsource: "Images/Plant.png",
    spriteYRow: 1,
    height: 32,
    width: 16,
    growTime: 1000,
    maxstage: 5,
  },

  carrot: {
    imgsource: "Images/Plant.png",
    spriteYRow: 2,
    height: 32,
    width: 16,
    growTime: 1200,
    maxstage: 5,
  },
  garlic: {
    imgsource: "Images/Plant.png",
    spriteYRow: 3,
    height: 32,
    width: 16,
    growTime: 1500,
    maxstage: 5,
  },
  wheat: {
    imgsource: "Images/Plant.png",
    spriteYRow: 4,
    height: 32,
    width: 16,
    growTime: 1000,
    maxstage: 5,
  },
  strawberry: {
    imgsource: "Images/Plant.png",
    spriteYRow: 5,
    height: 32,
    width: 16,
    growTime: 2000,
    maxstage: 5,
  },
};
