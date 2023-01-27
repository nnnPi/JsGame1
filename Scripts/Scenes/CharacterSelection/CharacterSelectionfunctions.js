// logic to handle drawing character eveywhere, depending on their sprite size and pixel size of the tile.
function drawMenuCharonTile(occupiedtile) {
  //case character is a square taking up 4 tiles

  tileMenu.forEach((element) => {
    if (element.tiley % 2 === 0 && element.tilex % 2 === 0) {
      if (occupiedtile.length < CharacterSpriteSourceList.length) {
        occupiedtile.push(element);
      }
      return occupiedtile;
    }
  });
  // console.log(occupiedtile);
  for (let i = 0; i < occupiedtile.length; i++) {
    ctx.drawImage(
      CharacterSpriteSourceImage[i],
      0,
      0,
      spriteWidth,
      spriteHeight,
      occupiedtile[i].canvasx,
      occupiedtile[i].canvasy,
      spriteWidth,
      spriteHeight
    );
  }
  // console.log(occupiedtile);
  return occupiedtile;
}

// place to refine PlayerDefinition
function selector(e) {
  //quick workaround char not loading just click a fewtimes
  //drawMenuCharonTile();
  drawMenuCharonTile(occupiedtile);

  console.log("i just draw the character message 1");

  let clickedx = e.clientX - (container.offsetLeft - CANVAS_WIDTH * 0.5);
  let clickedy = e.clientY - (container.offsetTop - CANVAS_HEIGHT * 0.5);

  // is clicked tile
  tileMenu.forEach((element) => {
    element.TisclickedT(clickedx, clickedy, HorizontalOffset, VerticalOffset);
    if (element.clicked === true) {
      clickedtile = element;
      return clickedtile;
    }
  });
  // is clicked tile occupied ?
  // only work while accounting for 4 tile due too charachter being 4 tile, this is why the +2*tilepixelsize
  // made with tile = 16px character = 32px in mind
  for (let i = 0; i < occupiedtile.length; i++) {
    if (
      clickedtile.canvasx >= occupiedtile[i].canvasx &&
      clickedtile.canvasx < occupiedtile[i].canvasx + 2 * tilepixelsize &&
      clickedtile.canvasy >= occupiedtile[i].canvasy &&
      clickedtile.canvasy < occupiedtile[i].canvasy + 2 * tilepixelsize
    ) {
      nameselection(Playernamesuggestions);

      playerImage.src = CharacterSpriteSourceList[i];

      let PlayerDefinition = {
        height: 32,
        width: 32,
        imgsource: playerImage,
        noise: goblinnoise,
        spriteXmax: 32,
      };

      if (PlayerDefinition) {
        player.push(
          new Player(charpos.x - 15, charpos.y + 32, PlayerDefinition)
        );
        selected = new CustomEvent("PlayerSelected", {
          detail: {
            ready: "true",
          },
        });
        document.dispatchEvent(selected);
        funnysound[1].play();
        document.removeEventListener("click", selector, true);
        e.stopImmediatePropagation();
      }
    }
  }
}

//ok i tried something there uh
function nameselection(array) {
if( STATE==="notatest"){

  let input = prompt(
    "Oh i see you want to play a monster, couldn't you pick a name too ? eh, anyway what do you think of  " +
      array[0] +
      " or " +
      array[1] +
      "?  Maybe you prefer " +
      array[2] +
      " ? Type 1 2 3 to let me know"
  );

  if (
    input != null &&
    //typeof input === "number" &&
    input != 1 &&
    input != 2 &&
    input != 3 &&
    input < 3
  ) {
    alert("you can't count so i will just call you idiot");
  } else if (input != null && (input == 1 || input == 2 || input == 3)) {
    alert(
      "No you should have choosen " +
        array[3] +
        " that's how i'm going to call you"
    );
  } else if (
    input != null &&
    //  typeof input === typeof 2 &&
    input > 3
  ) {
    alert(
      "Oh i see a we have a smart ass here, i'm gonna call you  " + array[4]
    );
  } else if (
    input === "Morve" ||
    input === "Dork" ||
    input === "Dorf" ||
    input === "Piss"
  ) {
    alert(
      "Waow, i'm not impressed by your literacy, i said type 1 2 3 what's wrong with you mister " +
        array[6] +
        " That's your name for me now"
    );
  } else if (input === "psznm") {
    alert(" oh hi there !");
  } else if (typeof input === "string") {
    if (seed % 10 === 2) {
      alert(
        "I said type 1 2 or 3, you think i can't handle you typing letter ? I can perfectly tell you typed " +
          array[8] +
          " It's a shit name but it's not mine"
      );
    } else {
      alert(
        "that sound a little like " +
          array[7] +
          " so that's your name for me now !"
      );
    }
  } else {
    if (seed % 10 === 3)
      alert(
        "you really sound like someone that wants to be called " + array[5]
      );
    else if (seed % 10 === 4) {
      alert("pffffff");
    } else if (seed % 10 === 9) {
      alert("olala ");
    } else {
      alert(" you didn't type anything, so i'm going to call you derp");
    }
  }
}
}