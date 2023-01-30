// Make this script active only when called from ModeSelection
document.addEventListener("MapEditorMode", (mem) => {
  // Prevent the call from ModeSelection to continue occuring once this script is active
  document.removeEventListener("click", GameModeselector, true);
  // Allow other part of the game to know this script is active, like the rightbar or leftbar
  STATE.status = "MapEditor";
  //require CANVAS_HEIGHT as canvas1
  //require CANVAS_WIDTH as canvas1
  //require ctx be canvas1
  // Clear the Canvas to prepare to Map Editor
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // Make User know the Map editor is Active
  //alert("map editor activated lulz");

  selectedtile = [];
  //annonyingly global, should exist only in the functions
  squareselectionarray = [];
  tempclipboard = [];
  TileBlockList = [];

  tileEditor = [];
  let forwhat = {
    purpose: "mapeditor",
    // 0:43 for transparent
    // 0:11 for greengrass background
    tiletype: { tilesheet: 0, tilekey: 43 },
  };
  isPainting = false;
  isBrushing = false;
  isSelecting = false;
  isSquaring = false;

  isPaintorselected = false;
  isSelectorselected = false;

  isSquaremode = false;
  isBrushmode = false;

  isOverlayactive = false;
  isDefininganchor = false;
  isPasting = false;
  isPastingL = false;
  // create a bunch of instance of tile too fill in the screen

  tileEditorDescriptor = FabricateTilingDescriptor(16, canvas, true);
  populateTileArray(tileEditorDescriptor, tileEditor, forwhat);

  canvas1.addEventListener("mousedown", (e) => {
    if (isBrushmode === true) {
      isBrushing = true;
    }
    if (isSquaremode === true) {
      isSquaring = true;
    }
    if (isPaintorselected === true) {
      isPainting = true;
    }
    if (isSelectorselected === true) {
      isSelecting = true;
    }
    if (isDefininganchor === true) {
      let tempblock = clicktomakenewtileblock(e);

      if (tempblock !== undefined) {
        tempclipboard.push(tempblock);
        handleCopymodecleanup(e);
      }
    }

    if (isPasting === true) {
      clicktopastetileblock(
        e,
        tileEditor,
        tempclipboard,
        tempclipboard.length - 1
      );
    }
    if (isPastingL === true) {
      clicktopastetileblockonlayer(
        e,
        tileEditor,
        MapEditor.destinationlayer,
        tempclipboard,
        tempclipboard.length - 1
      );
    } else {
      brushmodefunction(e);
      squaremodefunction(e, 0);
    }
  });

  canvas1.addEventListener("mousemove", (emm) => {
    if (isBrushing === true) {
      brushmodefunction(emm);
    }
    if (isSquaring === true) {
      squaremodefunction(emm, 1);
    }
  });
  canvas1.addEventListener("mouseleave", (eml) => {
    if (isSquaring === true) {
      cleanupsquaremode();
    }
    if (
      isBrushing === true ||
      isSelecting === true ||
      isPainting === true ||
      isSquaring === true
    ) {
      isBrushing = false;
      isSelecting = false;
      isPainting = false;
      isSquaring = false;
    }
  });

  window.addEventListener("mouseup", (emu) => {
    if (isSquaring === true) {
      cleanupsquaremode();
    }
    if (
      isBrushing === true ||
      isSelecting === true ||
      isPainting === true ||
      isSquaring === true
    ) {
      isBrushing = false;
      isSelecting = false;
      isPainting = false;
      isSquaring = false;
    }
  });

  function animateEditor() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawStoredTileArray(TileSet, tileEditor);
    prerenderingselection(selectedtile);
    drawrenderedselection(selectedtile);

    gameFrame++;
    setTimeout(animateEditor, refreshtimer);
  }

  animateEditor();
});
