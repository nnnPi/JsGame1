document.addEventListener("GameMode", (elt) => {
  document.removeEventListener("click", GameModeselector, true);
funnysound[0].play();
  STATE.status = "CharacterSelection";
  console.log("Entering Character Selection Menu");
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
 // alert("clik char to selec");

  occupiedtile = [];
  tileMenu = [];
  // uses canvas#1 because canvas is global
  tileMenuDescriptor = FabricateTilingDescriptor(16, canvas, true);
  
  // this is used to load a map
  recreateTileArray(menumap,tileMenu,"CharacterSelection")
  
  //update tiles
  drawStoredTileArray(TileSet, tileMenu);

  // Function to draw the character on the first few rows of the menu and return an array with the position of the occupied tiles
  drawMenuCharonTile(occupiedtile);

  console.log("i just draw the character message 1");

  document.addEventListener("click", selector, true, { once: true });
});
