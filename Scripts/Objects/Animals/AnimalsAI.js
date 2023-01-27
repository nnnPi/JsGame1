// function used to update cats
function catupdate(cat) {
  // change orientation and make a noise after some time
  // clockwise rotation based on birth frame
  cat.age = gameFrame - cat.birth;
  let clockwiserow = [3, 2, 0, 1, 3];
  let clockwiseorientation = ["none", "East", "South", "West", "North"];
  // cat whose age is odd ( 1 chance out of 2)
  if (cat.birth % 2 === 1) {
    // sometimes ( 1 chance out of 32)
    if (cat.age % 128 === seed % 128) {
      // for all possible orientation
      for (let i = 4; i >= 0; i--) {
        // change the orientation to the next one or loop to the first one, which is skipped
        if (cat.orientation === clockwiseorientation[i]) {
          cat.orientation = clockwiseorientation[(i + 1) % 5];
          cat.spriteYRow = clockwiserow[(i + 1) % 5];
        }
      }
      // make noise if you can
      if (cat.noise) {
        cat.noise[Math.floor(Math.random() * cat.noise.length)].play();
      }
    }
  } else {
    //  counter clockwise rotation based on birth frame

    // sometimes ( 1 chance out of 32)
    if (cat.age % 128 === seed % 128) {
      // for all possible orientation
      for (let i = 4; i >= 0; i--) {
        // change the orientation to the next one or loop to the first one, which is skipped
        if (cat.orientation === clockwiseorientation[i]) {
          cat.orientation = clockwiseorientation[(i + 1) % 5];
          cat.spriteYRow = clockwiserow[(i + 1) % 5];
        }
      }
      // make noise if you can
      if (cat.noise) {
        cat.noise[Math.floor(Math.random() * cat.noise.length)].play();
      }
    }
  }

  // move in circular pattern slowly
  if (cat.age % 3 == 0) {
    if (cat.orientation == "South") {
      cat.y += 1;
    }
    if (cat.orientation == "North") {
      cat.y -= 1;
    }
    if (cat.orientation == "East") {
      cat.x += 1;
    }
    if (cat.orientation == "West") {
      cat.x -= 1;
    }
  }

  // move legs
  // assume all orientation have same number of sprite in their row

  moveleg(cat);
}

// function used to update lizard
function lizardupdate(lizard) {
  // specific for lizard

  if (
    Math.abs(lizard.y - charpos.y) < 16 &&
    Math.abs(lizard.x - charpos.x) < 16
  ) {
    alert(
      "Congratulations !! you caught a lizard, you can read this prompt, and maybe later you will have an inventory to put it. If you picked the smallest character first try the game is less funny, try another one"
    );
  }

  // change orientation and make a noise after some time
  // clockwise rotation based on birth frame
  lizard.age = gameFrame - lizard.birth;
  let clockwiserow = [3, 2, 0, 1, 3];
  let clockwiseorientation = ["none", "East", "South", "West", "North"];
  // cat whose age is odd ( 1 chance out of 2)

  if (
    Math.abs(lizard.y - charpos.y) < 80 &&
    Math.abs(lizard.x - charpos.x) < 80 &&
    playerImage.src.includes("smolFarmy") === false
  ) {
    lizard.state = "alerted";
    lizard.currentanimationspeed = 0.2 * lizard.baseanimationspeed;
  } else {
    lizard.state = "idle";
    lizard.currentanimationspeed = lizard.baseanimationspeed;
  }
  if (lizard.state === "idle") {
    // sometimes ( 1 chance out of 128)
    if (lizard.age % 128 === seed % 128) {
      // for all possible orientation
      for (let i = 4; i >= 0; i--) {
        // change the orientation to the next one or loop to the first one, which is skipped
        if (lizard.orientation === clockwiseorientation[i]) {
          lizard.orientation = clockwiseorientation[(i + 1) % 5];
          lizard.spriteYRow = clockwiserow[(i + 1) % 5];
        }
      }
      // make noise if you can
      if (lizard.noise) {
        lizard.noise[Math.floor(Math.random() * lizard.noise.length)].play();
      }
    }
  } else {
    // case player is on the left
    if (lizard.x - charpos.x >= 0) {
      // left and up
      if (lizard.y - charpos.y >= 0) {
        lizard.orientation = "East";
        lizard.spriteYRow = clockwiserow[1];
      }
      // left and down
      else {
        lizard.orientation = "North";
        lizard.spriteYRow = clockwiserow[4];
      }
    }
    // case player is on the right
    else {
      //right and up
      if (lizard.y - charpos.y >= 0) {
        lizard.orientation = "South";
        lizard.spriteYRow = clockwiserow[2];
      }
      //right and down
      else {
        lizard.orientation = "West";
        lizard.spriteYRow = clockwiserow[3];
      }
    }
  }

  if (lizard.state === "idle") {
    // move in circular pattern slowly
    if (lizard.age % 3 == 0) {
      if (lizard.orientation == "South") {
        lizard.y += 1;
      }
      if (lizard.orientation == "North") {
        lizard.y -= 1;
      }
      if (lizard.orientation == "East") {
        lizard.x += 1;
      }
      if (lizard.orientation == "West") {
        lizard.x -= 1;
      }
    }
  } else {
    if (lizard.orientation == "South") {
      lizard.y += 5;
    }
    if (lizard.orientation == "North") {
      lizard.y -= 5;
    }
    if (lizard.orientation == "East") {
      lizard.x += 5;
    }
    if (lizard.orientation == "West") {
      lizard.x -= 5;
    }
  }

  // move legs
  // assume all orientation have same number of sprite in their row

  moveleg(lizard);
}

// function used to update animal that do not have a specific update function
function pigupdate(pig) {
  // change orientation and make a noise after some time
  // clockwise rotation based on birth frame
  pig.age = gameFrame - pig.birth;
  let clockwiserow = [3, 2, 0, 1, 3];
  let clockwiseorientation = ["none", "East", "South", "West", "North"];
  // pig whose age is odd ( 1 chance out of 2)
  if (pig.birth % 2 === 1) {
    // sometimes ( 1 chance out of 128)
    if (pig.age % 128 === Math.pseudorandom(128)) {
      // for all possible orientation
      for (let i = clockwiseorientation.length - 1; i >= 0; i--) {
        // change the orientation to the next one or loop to the first one, which is skipped
        if (pig.orientation === clockwiseorientation[i]) {
          pig.orientation =
            clockwiseorientation[(i + 1) % clockwiseorientation.length];
          pig.spriteYRow = clockwiserow[(i + 1) % clockwiseorientation.length];
        }
      }
      // make noise if you can
      if (pig.noise) {
        pig.noise[Math.floor(Math.random() * pig.noise.length)].play();
      }
    }
  } else {
    //  counter clockwise rotation based on birth frame

    // sometimes ( 1 chance out of 128)
    if (pig.age % 128 === Math.pseudorandom(128)) {
      // for all possible orientation
      for (let i = 4; i >= 0; i--) {
        // change the orientation to the next one or loop to the first one, which is skipped
        if (pig.orientation === clockwiseorientation[i]) {
          pig.orientation = clockwiseorientation[(i + 1) % 5];
          pig.spriteYRow = clockwiserow[(i + 1) % 5];
        }
      }
      // make noise if you can
      if (pig.noise) {
        pig.noise[Math.floor(Math.random() * pig.noise.length)].play();
      }
    }
  }

  // move in circular pattern slowly
  if (pig.age % 3 == 0) {
    if (pig.orientation == "South") {
      pig.y += 1;
    }
    if (pig.orientation == "North") {
      pig.y -= 1;
    }
    if (pig.orientation == "East") {
      pig.x += 1;
    }
    if (pig.orientation == "West") {
      pig.x -= 1;
    }
  }
  moveleg(pig);
}

// function used to update animal that do not have a specific update function
function genericupdate(genericanimal) {
  // function for all animal except cat and lizard
  if (genericanimal.specie != "cat" || genericanimal.specie != "lizard") {
    // change orientation and make a noise after some time
    // clockwise rotation based on birth frame
    genericanimal.age = gameFrame - genericanimal.birth;

    if (genericanimal.birth % 2 == 1) {
      if (genericanimal.age % 80 == 79 && genericanimal.orientation == "East") {
        genericanimal.spriteYRow = 3;
        genericanimal.orientation = "North";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
      if (
        genericanimal.age % 80 == 20 &&
        genericanimal.orientation == "South"
      ) {
        genericanimal.spriteYRow = 2;
        genericanimal.orientation = "East";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
      if (genericanimal.age % 80 == 40 && genericanimal.orientation == "West") {
        genericanimal.spriteYRow = 0;
        genericanimal.orientation = "South";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
      if (
        genericanimal.age % 80 == 60 &&
        genericanimal.orientation == "North"
      ) {
        genericanimal.spriteYRow = 1;
        genericanimal.orientation = "West";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
    } else {
      //  counter clockwise rotation based on birth frame

      if (genericanimal.age % 80 == 79 && genericanimal.orientation == "East") {
        genericanimal.spriteYRow = 0;
        genericanimal.orientation = "South";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
      if (
        genericanimal.age % 80 == 20 &&
        genericanimal.orientation == "North"
      ) {
        genericanimal.spriteYRow = 2;
        genericanimal.orientation = "East";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
      if (genericanimal.age % 80 == 40 && genericanimal.orientation == "West") {
        genericanimal.spriteYRow = 3;
        genericanimal.orientation = "North";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
      if (
        genericanimal.age % 80 == 60 &&
        genericanimal.orientation == "South"
      ) {
        genericanimal.spriteYRow = 1;
        genericanimal.orientation = "West";
        if (genericanimal.noise) {
          genericanimal.noise[Math.pseudorandom(genericanimal.noise.length)
          ].play();
        }
      }
    }

    // move in circular pattern

    if (genericanimal.orientation == "South") {
      genericanimal.y += 1;
    }
    if (genericanimal.orientation == "North") {
      genericanimal.y -= 1;
    }
    if (genericanimal.orientation == "East") {
      genericanimal.x += 1;
    }
    if (genericanimal.orientation == "West") {
      genericanimal.x -= 1;
    }

    // move legs
    // assume all orientation have same number of sprite in their row

    if (genericanimal.age % genericanimal.baseanimationspeed == 0) {
      if (genericanimal.spx < genericanimal.spriteXmax) {
        genericanimal.spx += 1;
      } else {
        genericanimal.spx = 0;
      }
    }
  }
}
