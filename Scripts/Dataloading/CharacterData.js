//player character sprite:

// length of this array assumed to be small enough not to fill in the whole canvas with characters
const CharacterSpriteSourceList = [
  "Images/Character/goblin3stolen.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Goblin2.png",
  "Images/Character/Goblin3.png",
  "Images/Character/Goblin4.png",
  "Images/Character/Goblin5.png",
  "Images/Character/Goblin6.png",
  "Images/Character/Goblin7.png",
  "Images/Character/GoblinWizard.png",
  "Images/Character/Wizard.png",
  "Images/Character/Ninja1.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/smolFarmy.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/otaku.png",
  "Images/Character/RedRambo.png",
  "Images/Character/Rouge.png",
  "Images/Character/Cindy.png",
  "Images/Character/Wanda.png",
  "Images/Character/Bankster.png",
  "Images/Character/Niels.png",
  "Images/Character/Monk.png",
  "Images/Character/Wizard2.png",
  /* 

  "Images/Character/Goblin1.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/goblin3stolen.png",
  "Images/Character/GoblinWizard.png",
  "Images/Character/Wizard.png",
  "Images/Character/Ninja1.png",
  "Images/Character/Bankster.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/RedRambo.png",
  "Images/Character/Cindy.png",
  "Images/Character/otaku.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Cindy.png",
  "Images/Character/Goblin2.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/Goblin3.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/otaku.png",
  "Images/Character/Cindy.png",
  "Images/Character/Wanda.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Goblin5.png",
  "Images/Character/Goblin6.png",
  "Images/Character/RedRambo.png",
  "Images/Character/GoblinWizard.png",

  "Images/Character/Goblin4.png",
  "Images/Character/Wanda.png",
  "Images/Character/otaku.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin5.png",
  "Images/Character/Goblin1.png",

  "Images/Character/Ninja1.png",

  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/Goblin3.png",
  "Images/Character/RedRambo.png",
  "Images/Character/Goblin6.png",
  "Images/Character/Goblin4.png",
  "Images/Character/Noiracide_RomiGif.png",

  "Images/Character/Wizard.png",

  "Images/Character/Goblin1.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/RedRambo.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/Goblin6.png",
  "Images/Character/Goblin5.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/RedRambo.png",
  "Images/Character/goblin3stolen.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/GoblinWizard.png",

  "Images/Character/Ninja1.png",
  "Images/Character/goblin3stolen.png",

  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Rouge.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/Goblin2.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/Goblin3.png",
  "Images/Character/Goblin5.png",
  "Images/Character/GoblinWizard.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Wanda.png",
  "Images/Character/Rouge.png",
  "Images/Character/Goblin4.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Cindy.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/goblin3stolen.png",

  "Images/Character/Wizard.png",
  "Images/Character/Ninja1.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/otaku.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Goblin2.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/Goblin3.png",
  "Images/Character/Cindy.png",
  "Images/Character/Goblin6.png",
  "Images/Character/Goblin5.png",
  "Images/Character/Goblin4.png",
  "Images/Character/fatFarmy.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/goblin3stolen.png",
  "Images/Character/goblin4stolen.png",

  "Images/Character/Goblin1.png",
  "Images/Character/Rouge.png",
  "Images/Character/Goblin2.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/Goblin3.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Goblin4.png",
  "Images/Character/Cindy.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/goblin3stolen.png",
  "Images/Character/Goblin5.png",

  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Cindy.png",
  "Images/Character/Noiracide_RomiGif.png",
  "Images/Character/Goblin6.png",
  "Images/Character/Goblin3.png",
  "Images/Character/Wanda.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Cindy.png",
  "Images/Character/Goblin4.png",
  "Images/Character/Goblin6.png",
  "Images/Character/Goblin5.png",
  "Images/Character/goblin4stolen.png",
  "Images/Character/Goblin1.png",
  "Images/Character/Noiracide_RomiGif.png", */
];

// length of this array assumed to be small enough not to fill in the whole screen with characters
// CharacterSelection is done by clicking on an image associated with the index of this array
let CharacterSpriteSourceImage = [];
CharacterSpriteSourceList.forEach((element) => {
  CharacterSpriteSourceImage.push(new Image());
});

for (let i = 0; i < CharacterSpriteSourceList.length; i++) {
  CharacterSpriteSourceImage[i].src = CharacterSpriteSourceList[i];
}

// Character name proposal

const Playernamesuggestions = [
  "Morve",
  "Beurk",
  "Dork",
  "Dorf",
  "Piss",
  "Shlag",
  "LookAtmyWiwi",
  "Mop",
  "T5 ds-#%1't $£",
  "chu",
];

//current case : all character make goblin noise
//goblin sound noise

const GoblinSoundlist = [
  "Sounds/goblin/goblin1.mp3",
  "Sounds/goblin/goblin2.mp3",
  "Sounds/goblin/goblin3.mp3",
  "Sounds/goblin/goblin4.mp3",
  "Sounds/goblin/goblin5.mp3",
  "Sounds/goblin/goblin6.mp3",
  "Sounds/goblin/goblin7.mp3",
  "Sounds/goblin/goblin8.mp3",
  "Sounds/goblin/goblin9.mp3",
  "Sounds/goblin/goblin10.mp3",
  "Sounds/goblin/goblin11.mp3",
  "Sounds/goblin/goblin12.mp3",
  "Sounds/goblin/goblin13.mp3",
  "Sounds/goblin/goblin14.mp3",
  "Sounds/goblin/goblin15.mp3",
];

let goblinnoise = [];
GoblinSoundlist.forEach((element) => {
  goblinnoise.push(new Audio(element));
});
