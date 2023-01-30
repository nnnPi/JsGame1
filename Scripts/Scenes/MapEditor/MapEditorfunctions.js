// some function to edit the map shown in the editor
// most of them are called from right bar

//describe how the brush function
function brushmodefunction(e) {
  // supposed to be true at all time
  if (isBrushmode === true) {
    // create clicked object if click is allowed
    if (
      TestClickAllowedCanvas1(
        CanvasCoordinateTranslation(e, canvas),
        HorizontalOffset,
        VerticalOffset
      )
    ) {
      let clicked = TestClickAllowedCanvas1(
        CanvasCoordinateTranslation(e, canvas),
        HorizontalOffset,
        VerticalOffset
      );
      customrepeatplay(UIsmalltick1sound);
      // select a tile based on the clicked object
      if (isSelecting === true) {
        clicktoselecttile(clicked);
      }
      // paint a tile based on the clicked object
      if (isPainting === true) {
        // change the property of a tile if it match the {clicked}
        clicktomorph(clicked);
      }
    }
  }
}
// describe how the rectangle function
function squaremodefunction(e, init) {
  // should be true allways when function is called
  if (isSquaremode === true) {
    // check if the click is in a correct position
    if (
      TestClickAllowedCanvas1(
        CanvasCoordinateTranslation(e, canvas),
        HorizontalOffset,
        VerticalOffset
      )
    ) {
      // on mousedown
      if (init === 0) {
        // annoyingly global otherwise the following part can't see
        // used when the function is called later with init !=0 to track from origin position
        squareselectionarray = [];
        originclicked = TestClickAllowedCanvas1(
          CanvasCoordinateTranslation(e, canvas),
          HorizontalOffset,
          VerticalOffset
        );
      }
      // if moving
      else {
        // update current position
        let currentclicked = TestClickAllowedCanvas1(
          CanvasCoordinateTranslation(e, canvas),
          HorizontalOffset,
          VerticalOffset
        );
        // compute the 2 tiles ID, origin and current
        let origintile = WhichTileisClicked(
          originclicked,
          HorizontalOffset,
          VerticalOffset
        );
        let currenttile = WhichTileisClicked(
          currentclicked,
          HorizontalOffset,
          VerticalOffset
        );
        // we find out the relative distance in tile number between origin and current
        let xincrement =
          tileEditor[origintile].tilex - tileEditor[currenttile].tilex;
        let yincrement =
          tileEditor[origintile].tiley - tileEditor[currenttile].tiley;
        // Math.abs(xincrement*yincrement) gives us the total number of tile selected
        // annooingly global
        squareselectionarray = [];
        // for each 1 absolute distance, we loop by 1 increment of relative distance on each axis
        for (let i = Math.abs(xincrement); i >= 0; i--) {
          for (let j = Math.abs(yincrement); j >= 0; j--) {
            // to find out what is the column and row of the different tile to add to the selection array
            let tiletoaddx =
              tileEditor[origintile].tilex - Math.sign(xincrement) * i;
            let tiletoaddy =
              tileEditor[origintile].tiley - Math.sign(yincrement) * j;
            let tiletoaddid = tiletoaddx + tiletoaddy * TileColumn;
            // only their ID is added in the array

            squareselectionarray.push(tiletoaddid);
          }
        }
        drawpreviewsquareselection(originclicked, currentclicked);
        if (
          UIelectricsound[0].busy === false ||
          UIelectricsound[0].currentTime === 0 ||
          UIelectricsound[0].currentTime === UIelectricsound[0].duration
        ) {
          UIelectricsound[0].volume = 0.5;
          UIelectricsound[0].play();
          UIelectricsound[0].busy = true;
        }
      }
    }
  }
}
// necessary to call when exiting the rectangle function
function cleanupsquaremode() {
  if (isSelecting === true) {
    squareselectionarray.forEach((element) => {
      if (
        !tileEditor[element].selected ||
        tileEditor[element].selected === false
      ) {
        tileEditor[element].selected = true;
        selectedtile.push(tileEditor[element]);
      }
    });
  }
  if (isPainting === true) {
    squareselectionarray.forEach((element) => {
      tileEditor[element].forwhat = {
        ...tileEditor[element].forwhat,
        tiletype: {
          ...tileEditor[element].forwhat.tiletype,
          tilesheet: sheetselectedforeditor,
          tilekey:  MapEditor.tiletopaint,
        },
      };
    });
  }

  fadeout(32, UIelectricsound[0], 0.01);
}

//describe how the selected area are highlighted
function drawpreviewsquareselection(originclicked, currentclicked) {
  let x = originclicked.x;
  let y = originclicked.y;
  let width = originclicked.x - currentclicked.x;
  let height = originclicked.y - currentclicked.y;
  ctx.save();
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.rect(x, y, -width, -height);
  ctx.stroke();
  ctx.restore();
}
// return object clicked tile if it is one
// use the which tile function from loading
function turnatileintoclickedtile(TileArray, clicked) {
  if (
    WhichTileisClicked(clicked, HorizontalOffset, VerticalOffset) >= 0 &&
    WhichTileisClicked(clicked, HorizontalOffset, VerticalOffset) <
      TileArray.length
  ) {
    clickedtile =
      TileArray[WhichTileisClicked(clicked, HorizontalOffset, VerticalOffset)];
    return clickedtile;
  }
}

// turn a tile into a clickedtile from clicked object containing x and y from canvas
function clicktoselecttile(clicked) {
  turnatileintoclickedtile(tileEditor, clicked);

  if (
    !tileEditor[clickedtile.Ide].selected ||
    tileEditor[clickedtile.Ide].selected === false
  ) {
    tileEditor[clickedtile.Ide].selected = true;
    selectedtile.push(tileEditor[clickedtile.Ide]);
    customrepeatplay(UIsmalltick2sound);
  }
}

// from clicked object containing x and y from canvas morph the corresponding tile into the current selected thing
// then check if there was no current thing selected and in this case replace it with a blank tile
// before it's drawn to prevent error
function clicktomorph(clicked) {
  turnatileintoclickedtile(tileEditor, clicked);
  morphclickedtile();
  checktilekeymismatchandreplaceerronous(
    tileEditor,
    TileSet,
    turnatileintoclickedtile(tileEditor, clicked)
  );
}

// the magix formula :
// edit of the forwhat that doesn't mutate all forwhat, only the one from the clicked tile.
// ... spread operator
// use only into this context
function morphclickedtile() {
  if (
    tileEditor[clickedtile.Ide].forwhat.tiletype.tilesheet !==
      sheetselectedforeditor ||
    tileEditor[clickedtile.Ide].forwhat.tiletype.tilekey !==  MapEditor.tiletopaint
  ) {
    tileEditor[clickedtile.Ide].forwhat = {
      ...tileEditor[clickedtile.Ide].forwhat,
      tiletype: {
        ...tileEditor[clickedtile.Ide].forwhat.tiletype,
        tilesheet: sheetselectedforeditor,
        tilekey:  MapEditor.tiletopaint,
      },
    };
    customrepeatplay(UIsmalltick2sound);
  }
}

// same as previous except with a tile array paratemer that it loops through
function morphselection(tileArray) {
  for (let i = 0; i < tileArray.length; i++) {
    tileEditor[tileArray[i].Ide].forwhat = {
      ...tileEditor[tileArray[i].Ide].forwhat,
      tiletype: {
        ...tileEditor[tileArray[i].Ide].forwhat.tiletype,
        tilesheet: sheetselectedforeditor,
        tilekey:  MapEditor.tiletopaint,
      },
    };
  }
}

// probably no longer necessarry due to code catching missmatch at the sheet selection moment
// edit : still shows up sometimes
function checktilekeymismatchandreplaceerronous(
  tileArray,
  TileSet,
  clickedtile
) {
  if (clickedtile != undefined) {
    if (
      tileArray[clickedtile.Ide].forwhat.tiletype.tilekey >
        TileSet[tileArray[clickedtile.Ide].forwhat.tiletype.tilesheet].length ||
      tileArray[clickedtile.Ide].forwhat.tiletype.tilesheet > TileSet.length
    ) {
      alert(
        "There is no tile " +
          tileArray[clickedtile.Ide].forwhat.tiletype.tilekey +
          " in the spritesheet " +
          tileArray[clickedtile.Ide].forwhat.tiletype.tilesheet +
          " An empty tile is drawn instead"
      );

      tileArray[clickedtile.Ide].forwhat = {
        ...tileArray[clickedtile.Ide].forwhat,
        tiletype: {
          ...tileArray[clickedtile.Ide].forwhat.tiletype,
          tilekey: 43,
          tilesheet: 0,
        },
      };
    }
  }
}

// used to make the numbers for tiles overlay drawn last
function prerenderingselection() {
  if (isOverlayactive === true) {
    printsheetoverlay(sheetselectedforeditor, TileColumn);
  }
}
// adds a semi transparent layer over the selected tiles
function drawrenderedselection(tileArray) {
  ctx.save();
  ctx.globalAlpha = 0.2;
  for (let i = 0; i < tileArray.length; i++) {
    ctx.fillRect(tileArray[i].canvasx, tileArray[i].canvasy, 16, 16);
  }
  ctx.restore();
}
// unselect all tiles that were selected
function unselectalltile(selectedtile) {
  for (let i = 0; i < selectedtile.length; i++) {
    if (tileEditor[selectedtile[i].Ide].selected === true) {
      tileEditor[selectedtile[i].Ide].selected = false;
    }
  }

  return (selectedtile = []);
}

// transform all selected tiles into empty tile ( 0:43) by default
function clearselectedtiles(selectedtile, tileArray) {
  for (let i = 0; i < selectedtile.length; i++) {
    tileArray[selectedtile[i].Ide].forwhat = {
      ...tileArray[selectedtile[i].Ide].forwhat,
      tiletype: {
        ...tileArray[selectedtile[i].Ide].forwhat.tiletype,
        tilesheet: 0,
        tilekey: 43,
      },
    };
  }
}

// let the user input a value to select the sprite sheet ( used in mapEditor)
function LetUserChooseFromArrayforsheet(array, string) {
  let input = prompt(
    "Choose a value between 0 and " + (array.length - 1) + " to " + string
  );
  const processedInput = parseInt(input) || 0;
  if (
    processedInput != null &&
    //typeof input==="number"&&
    processedInput >= 0 &&
    processedInput <= array.length - 1 &&
    processedInput != ""
  ) {
    // console.log(input)
    customrepeatplay(UIChangesheetsound);
    return processedInput;
  } else {
    customrepeatplay(UIerrorsound);
    return 0;
  }
}
// let the user input a value to select the tile in the sprite sheet( used in mapEditor)
function LetUserChooseFromArrayfortile(array, string) {
  let input = prompt(
    "Choose a value between 1 and " + (array.length - 1) + " to " + string
  );
  const processedInput = parseInt(input) || 0;
  if (
    processedInput != null &&
    //typeof input==="number"&&
    processedInput >= 1 &&
    processedInput <= array.length - 1 &&
    processedInput != ""
  ) {
    // console.log(input)
    //console.log(processedInput)
    customrepeatplay(UIacceptsound);
    return processedInput;
  }
  //console.log('just 1='+processedInput+"no ?")
  else {
    customrepeatplay(UIerrorsound);
    return 1;
  }
}
// let the user input a value to select the destination layer
function LetUserinputdestinationlayer(destinationlayer) {
  let input = prompt(
    "The current layer is " +
      destinationlayer +
      " type another number less than 100 to pick another one"
  );
  const processedInput = parseInt(input) || 0;
  if (
    processedInput !== null &&
    //typeof input==="number"&&
    processedInput >= 0 &&
    processedInput < 100 &&
    processedInput !== ""
  ) {
    // console.log(input)
    //console.log(processedInput)
    customrepeatplay(UIacceptsound);
    return processedInput;
  }
  //console.log('just 1='+processedInput+"no ?")
  else {
    customrepeatplay(UIerrorsound);
    return 20;
  }
}

// to clear the canvas
function clearcanvas1() {
  for (let i = 0; i < tileEditor.length; i++) {
    tileEditor[i].forwhat = {
      ...tileEditor[i].forwhat,
      tiletype: {
        ...tileEditor[i].forwhat.tiletype,
        tilesheet: 0,
        tilekey: 43,
      },
    };
  }
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// draw all the tile from a spritesheet according to their initial disposition on the sheet
// waow

// to be improved
// then should add way to identify easily tile that trigger collision
// possibly draw the ID on the tile, to capture and use as reminder
// extra : able to register element that works together

// use the cuttingplan to remap the tilesheet in its original disposition on the canvas
function printafullspritesheet2(sheetselectedforeditor, TileColumn) {
  let toberestoredspritesheet = [];
  // first look at what is demanded by user
  for (let i = sheetselectedforeditor; i <= sheetselectedforeditor; i++) {
    // now that we know the spritsheet, we can access its tile
    Object.keys(
      TileSpriteSourceList[sheetselectedforeditor].scheme.tile
    ).forEach((key) => {
      //and we use the x and y column/row position of the original sprite sheet
      // with the number of column in our canvas to find out the id of the tile that need be changed
      let tiletorestore =
        TileSpriteSourceList[sheetselectedforeditor].scheme.tile[key].y *
          TileColumn +
        TileSpriteSourceList[sheetselectedforeditor].scheme.tile[key].x;
      //console.log(TileSpriteSourceList[sheetselectedforeditor].scheme.tile[key])
      // this number is stored in an array
      toberestoredspritesheet.push(tiletorestore);
    });
  }
  // console.log(toberestoredspritesheet);
  // this array index is the key of the tile that need to be drawn on the corresponding value
  // for each tile that need to be drawn,
  // change the tilesheet of the tile in the tileEditor array to be displayed to the choosen one
  // change the tilekey of the tile in the tileEditor array to be displayed to 1 more than i
  // to account for the property 0 being the image
  for (let i = 0; i < toberestoredspritesheet.length; i++) {
    tileEditor[toberestoredspritesheet[i]].forwhat = {
      ...tileEditor[toberestoredspritesheet[i]].forwhat,
      tiletype: {
        ...tileEditor[toberestoredspritesheet[i]].forwhat.tiletype,
        tilesheet: sheetselectedforeditor,
        tilekey: i + 1,
      },
    };
  }
}

// print number over tiles not elegant but working
function printsheetoverlay(sheetselectedforeditor, TileColumn) {
  let tobedrawnoverlay = [];
  for (let i = sheetselectedforeditor; i <= sheetselectedforeditor; i++) {
    Object.keys(
      TileSpriteSourceList[sheetselectedforeditor].scheme.tile
    ).forEach((key) => {
      let tiletodrawoverlay =
        TileSpriteSourceList[sheetselectedforeditor].scheme.tile[key].y *
          TileColumn +
        TileSpriteSourceList[sheetselectedforeditor].scheme.tile[key].x;
      tobedrawnoverlay.push(tiletodrawoverlay);
    });
  }
  ctx.save();
  ctx.font = " 7px sans serif";
  // pink
  ctx.fillStyle = "#de17a0";
  // white
  // ctx.fillStyle = "#ffffff";

  for (let i = 0; i < tobedrawnoverlay.length; i++) {
    ctx.fillText(
      i + 1,
      -5 + tileEditor[tobedrawnoverlay[i]].canvasx + tilepixelsize * 0.5,
      5 + tileEditor[tobedrawnoverlay[i]].canvasy + tilepixelsize * 0.5
    );
  }
  ctx.restore();
}

// copy feature
// function called by rightbar when clicking if isDefininganchor is true
function clicktomakenewtileblock(clickevent) {
  if (
    TestClickAllowedCanvas1(
      CanvasCoordinateTranslation(clickevent, canvas),
      HorizontalOffset,
      VerticalOffset
    ) !== undefined &&
    selectedtile !== []
  ) {
    let tileobjectselectedasanchor =
      tileEditor[
        WhichTileisClicked(
          TestClickAllowedCanvas1(
            CanvasCoordinateTranslation(clickevent, canvas),
            HorizontalOffset,
            VerticalOffset
          ),
          HorizontalOffset,
          VerticalOffset
        )
      ];
    // see Tileblock.js object
    let newblock = makeanewtileblock(selectedtile, tileobjectselectedasanchor);

    return newblock;
  }
}

// paste feature
function clicktopastetileblock(
  clickevent,
  destinationarray,
  tileblocsourcearray,
  sourceposition
) {
  if (
    clickevent !== undefined &&
    tileblocsourcearray[sourceposition] !== undefined &&
    TestClickAllowedCanvas1(
      CanvasCoordinateTranslation(clickevent, canvas),
      HorizontalOffset,
      VerticalOffset
    ) !== undefined
  ) {
    customrepeatplay(UIPastesound);

    // detect the click
    let tileobjectselectedasnewanchor =
      destinationarray[
        WhichTileisClicked(
          TestClickAllowedCanvas1(
            CanvasCoordinateTranslation(clickevent, canvas),
            HorizontalOffset,
            VerticalOffset
          ),
          HorizontalOffset,
          VerticalOffset
        )
      ];
    let blocktodeploy = tileblocsourcearray[sourceposition];

    //let's compute the new destination span based on the tile that is the new anchor
    let newspan = [];
    for (let i = 0; i < blocktodeploy.span.length; i++) {
      newspan.push([
        blocktodeploy.span[i][0] + tileobjectselectedasnewanchor.tilex,
        blocktodeploy.span[i][1] + tileobjectselectedasnewanchor.tiley,
      ]);
    }
    //it is full of negative coordinate if part of the pasted element is outside the canvas
    // we get rid of those when we compute the id of the tile from the tilearray destination that is modified by the paste action

    for (let i = 0; i < newspan.length; i++) {
      if (
        newspan[i][0] < 0 ||
        newspan[i][0] >= TileColumn ||
        newspan[i][1] < 0 ||
        newspan[i][1] >= TileRow
      ) {
        // ignore
      }
      // associate with the lookup table
      else {
        let id = newspan[i][0] + newspan[i][1] * TileColumn;
        destinationarray[id].forwhat = {
          ...destinationarray[id].forwhat,
          tiletype: {
            ...destinationarray[id].forwhat.tiletype,
            tilesheet: blocktodeploy.lookup[i][0],
            tilekey: blocktodeploy.lookup[i][1],
          },
        };
      }
    }
  }
}

// paste feature 2 layered
function clicktopastetileblockonlayer(
  clickevent,
  destinationarray,
  destinationlayer,
  tileblocsourcearray,
  sourceposition
) {
  if (
    clickevent !== undefined &&
    tileblocsourcearray[sourceposition] !== undefined &&
    TestClickAllowedCanvas1(
      CanvasCoordinateTranslation(clickevent, canvas),
      HorizontalOffset,
      VerticalOffset
    ) !== undefined
  ) {
    customrepeatplay(UIPastesound);

    // detect the click
    let tileobjectselectedasnewanchor =
      destinationarray[
        WhichTileisClicked(
          TestClickAllowedCanvas1(
            CanvasCoordinateTranslation(clickevent, canvas),
            HorizontalOffset,
            VerticalOffset
          ),
          HorizontalOffset,
          VerticalOffset
        )
      ];
    let blocktodeploy = tileblocsourcearray[sourceposition];

    //let's compute the new destination span based on the tile that is the new anchor
    let newspan = [];
    for (let i = 0; i < blocktodeploy.span.length; i++) {
      newspan.push([
        blocktodeploy.span[i][0] + tileobjectselectedasnewanchor.tilex,
        blocktodeploy.span[i][1] + tileobjectselectedasnewanchor.tiley,
      ]);
    }
    //it is full of negative coordinate if part of the pasted element is outside the canvas
    // we get rid of those when we compute the id of the tile from the tilearray destination that is modified by the paste action

    for (let i = 0; i < newspan.length; i++) {
      if (
        newspan[i][0].length < 0 ||
        newspan[i][0].length >= TileColumn ||
        newspan[i][1].length < 0 ||
        newspan[i][1].length >= TileRow
      ) {
        // ignore
        // edit : doesn't work => pasting on an edge overlap with the other edge
        console.log("something too big was trimmed to fit the screen");
      }
      // associate with the lookup table
      // at the correct layer
      //
      else {
        let id = newspan[i][0] + newspan[i][1] * TileColumn;

        if (destinationarray[id]["layer"] === undefined) {
          destinationarray[id]["layer"] = {
            [`${destinationlayer}`]: [
              blocktodeploy.lookup[i][0],
              blocktodeploy.lookup[i][1],
            ],
          };
        } else {
          destinationarray[id]["layer"] = Object.assign(
            destinationarray[id]["layer"],
            {
              [`${destinationlayer}`]: [
                blocktodeploy.lookup[i][0],
                blocktodeploy.lookup[i][1],
              ],
            }
          );
        }
      }
    }
  }
}
