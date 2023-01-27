// this lane is to enable input logic / game logic only after character selection has happened
document.addEventListener("PlayerSelected", () => {
  // game logic
  // on click

  document.addEventListener("click", (e) => {
    //translate clicked position to account for scrolling or resizing.
    let clicked = CanvasCoordinateTranslation(e, canvas);

    // check if belong to canvas1 given the use of CANVAS_WIDTH and CANVAS_HEIGHT

    if (TestClickAllowedCanvas1(clicked, 0, 0)) {
      mouse.x = clicked.x;
      mouse.y = clicked.y;
      customrandomplay(goblinnoise)
    }
  });

  // DETECT Key interaction
  document.addEventListener("keydown", (KeyboardEvent) => {
    // KeyboardEvent.key is saying correct key for letter
    //KeyboardEvent.code only know qwerty but seem safer for 1 & 2 é # ...
    // when correct key pressed, instanciate Plant with position parameter
    // or instanciate Animal

    const PlantDefinition = planttodigit[KeyboardEvent.code];
    if (PlantDefinition) {
      plant.push(new Plant(charpos.x - 15, charpos.y + 32, PlantDefinition));
      shovelnoise[Math.floor(Math.random() * shovelnoise.length)].play();
    }
    const AnimalDefinition = animaltodigit[KeyboardEvent.code];
    if (AnimalDefinition) {
      animal.push(
        new Animal(charpos.x, charpos.y, charOrientation, AnimalDefinition)
      );
    }

    // if(KeyboardEvent.code){console.log(KeyboardEvent.code)};
    
    if (STATE.control==="keyboard") {
      console.log('keydetected')
      if (KeyboardEvent.code === "KeyW") {
        console.log("la on monte");
      }
    }
  });
});
