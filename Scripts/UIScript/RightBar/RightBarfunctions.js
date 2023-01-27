function makestaticlistRB(i) {
  const staticfunctionlistRB = [
    {
      style: smallbuttonRBtstyle,
      type: verticalArrowRB,
      text: UParrow,
      action: function () {
        movebutton1down()
        ;
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: verticalArrowRB,
      text: Downarrow,
      action: function () {
        movebutton1up();
      },
    },
    {
      style: TwoSideDispRBtstyle,
      type: TwoSideDispRB,
      text: RBbutton20SheetTileDisplay,
      action: function (clicked) {
        console.log('yo');
        tilesheetchoice (clicked)
      },
    },
  ];
  if (i === "init") {
    let result2 = [];
    for (j = 0; j < staticfunctionlistRB.length; j++) {
      result2.push(staticfunctionlistRB[j].text);
    }
    return result2;
  }
  if (i === "objectlistplz") {
    return staticfunctionlistRB;
  } else {
    return staticfunctionlistRB[i].action();
  }
}

function tilesheetchoice (clicked) {

  console.log(clicked)
if (clicked.x>60) { SelectTileKey()}
else {SelectTileSheet()}
 
  
}



// switcher
function makefunctionlistRB(i) {
  const functionlistRB = [
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton1SelectSpriteSheet,
      action: function () {
        SelectTileSheet();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton2SeletTile,
      action: function () {
        SelectTileKey();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton3DrawSpriteSheet,
      action: function () {
        DrawSpriteSheet(sheetselectedforeditor, TileColumn);
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton4DeleteAllTiles,
      action: function () {
        clearcanvas1RB();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton5Unselecttext,
      action: function () {
        selectedtile = unselectalltileRB(selectedtile);
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton6Transformselecttext,
      action: function () {
        morphselectionRB(selectedtile);
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton7PaintorTool,
      action: function () {
        handlePaintTool();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton8SelectorTool,
      action: function () {
        handleSelectorTool();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton9BrushMode,
      action: function () {
        handleBrushMode();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton10RectangleMode,
      action: function () {
        handleRectangleMode();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton11NomodeNotool,
      action: function () {
        handleNoMode();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton12ConsoleLog,
      action: function () {
        consolelogmap(tileEditor);
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton13Print,
      action: function () {
        handlePrintOverlay();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton14DelecteSelected,
      action: function () {
        clearselectedtilesRB(selectedtile, tileEditor);
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton15CopySelected,
      action: function () {
        switchanchordefiningmode();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton16PasteMode,
      action: function () {
        switchpastingmode();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton17ChangeElement,
      action: function () {},
    },
    {
      style: smallbuttonRBtstyle,
      type: smalltoggleRB,
      text: RBbutton18PasteLayered,
      action: function () {
        switchpastingmodelayered();
      },
    },
    {
      style: smallbuttonRBtstyle,
      type: smallbuttonRB,
      text: RBbutton19ChangeDestinationLayer,
      action: function () {
        MapEditor.destinationlayer =  changedestinationlayer();
        console.log( MapEditor.destinationlayer)
      },
    },





    
  ];
  if (i === "init") {
    let result = [];
    for (j = 0; j < functionlistRB.length; j++) {
      result.push(functionlistRB[j].text);
    }
    return result;
  } else if (i === "objectlistplz") {
    return functionlistRB;
  } else {
    return functionlistRB[i].action();
  }
}
// button 0 = static 0
function movebutton1up() {
  MapEditor.RightBarTextButton.ident += 1;
  MapEditor.buttonsfunctionlist.push(MapEditor.buttonsfunctionlist.shift());
  customrepeatplay(UIverticalnavsound)
}
// button static 1
function movebutton1down() {
  MapEditor.RightBarTextButton.ident -= 1;
  MapEditor.buttonsfunctionlist.unshift(MapEditor.buttonsfunctionlist.pop());
  customrepeatplay(UIverticalnavsound)
}

// button 1 by default
function SelectTileSheet() {
  customrepeatplay(UIticsound);
  let pick = LetUserChooseFromArrayforsheet(TileSet, " select a tilesheet");
  if (TileSet[pick].length <= tiletopaint) {
    alert(
      "you selected a spritesheet that doesn't contain the previously selected tile, it has been set to 0 instead"
    );
    tiletopaint = 0;
  } else {
    sheetselectedforeditor = pick;
  }
}

// button 2 by default
function SelectTileKey() {
  customrepeatplay(UIticsound);
  tiletopaint = LetUserChooseFromArrayfortile(
    TileSet[sheetselectedforeditor],
    "select a tile"
  );
}

// button 3 by default
function DrawSpriteSheet(sheetselectedforeditor, TileColumn) {
  printafullspritesheet2(sheetselectedforeditor, TileColumn);
  customrepeatplay(UIshishiutsound);
}

//button 4 by default
function clearcanvas1RB() {
  clearcanvas1();
  customrepeatplay(UIwoodpeckersound);
}

//button 5 by default
function unselectalltileRB(selectedtile) {
  selectedtile = unselectalltile(selectedtile);
  customrepeatplay(UIunselectsound);
  return selectedtile;
}

// button 6 by default
function morphselectionRB(selectedtile) {
  morphselection(selectedtile);
  customrepeatplay(UItransformsound);
}

// button 7 by default
function handlePaintTool() {
  console.log(MapEditor.RightBarTextButton);
  isPaintorselected = true;
  MapEditor.RightBarTextButton[6].toggle = "yes";
  MapEditor.RightBarTextButton[10].toggle = "no";
  isSelectorselected = false;
  MapEditor.RightBarTextButton[7].toggle = "no";
  isPasting = false;
  MapEditor.RightBarTextButton[15].toggle = "no";

  isDefininganchor = false;
  MapEditor.RightBarTextButton[14].toggle = "no";
  isPastingL = false;
  MapEditor.RightBarTextButton[17].toggle = "no";
  customrepeatplay(UItogglesound);
}

// button 8 by default
function handleSelectorTool() {
  console.log(MapEditor.RightBarTextButton);
  isSelectorselected = true;
  MapEditor.RightBarTextButton[7].toggle = "yes";
  MapEditor.RightBarTextButton[10].toggle = "no";
  isPaintorselected = false;
  MapEditor.RightBarTextButton[6].toggle = "no";
  isPasting = false;
  MapEditor.RightBarTextButton[15].toggle = "no";
  isDefininganchor = false;
  MapEditor.RightBarTextButton[14].toggle = "no";
  isPastingL = false;
  MapEditor.RightBarTextButton[17].toggle = "no";
  customrepeatplay(UItogglesound);
}

// button 9 by default
function handleBrushMode() {
  isBrushmode = true;
  MapEditor.RightBarTextButton[8].toggle = "yes";
  MapEditor.RightBarTextButton[10].toggle = "no";
  isSquaremode = false;
  MapEditor.RightBarTextButton[9].toggle = "no";
  isDefininganchor = false;
  MapEditor.RightBarTextButton[14].toggle = "no";
  isPasting = false;
  MapEditor.RightBarTextButton[15].toggle = "no";
  isPastingL = false;
  MapEditor.RightBarTextButton[17].toggle = "no";
  customrepeatplay(UItogglesound);
}

// button 10 by default
function handleRectangleMode() {
  isSquaremode = true;
  MapEditor.RightBarTextButton[9].toggle = "yes";
  MapEditor.RightBarTextButton[10].toggle = "no";
  isBrushmode = false;
  MapEditor.RightBarTextButton[8].toggle = "no";
  isDefininganchor = false;
  MapEditor.RightBarTextButton[14].toggle = "no";
  isPasting = false;
  MapEditor.RightBarTextButton[15].toggle = "no";
  isPastingL = false;
  MapEditor.RightBarTextButton[17].toggle = "no";
  customrepeatplay(UItogglesound);
}

// button 11 by default
function handleNoMode() {
  MapEditor.RightBarTextButton[10].toggle = "yes";
  isPaintorselected = false;
  MapEditor.RightBarTextButton[6].toggle = "no";
  isSelectorselected = false;
  MapEditor.RightBarTextButton[7].toggle = "no";
  isBrushmode = false;
  MapEditor.RightBarTextButton[8].toggle = "no";
  isSquaremode = false;
  MapEditor.RightBarTextButton[9].toggle = "no";
  isDefininganchor = false;
  MapEditor.RightBarTextButton[14].toggle = "no";
  isPasting = false;
  MapEditor.RightBarTextButton[15].toggle = "no";
  isPastingL = false;
  MapEditor.RightBarTextButton[17].toggle = "no";
  customrepeatplay(UItogglesound);
}

// button 12 by default
function consolelogmap(array) {
  console.log(array);
  customrepeatplay(UIprintersound);
}

// button 13 by default
function handlePrintOverlay() {
  if (isOverlayactive === false) {
    isOverlayactive = true;
    MapEditor.RightBarTextButton[12].toggle = "yes";
  } else if (isOverlayactive === true) {
    isOverlayactive = false;
    MapEditor.RightBarTextButton[12].toggle = "no";
  }
  customrepeatplay(UItogglesound);
}

// button 14 by default
function clearselectedtilesRB(selectedtile, tileEditor) {
  clearselectedtiles(selectedtile, tileEditor);
  customrepeatplay(UIcoinonosound);
}

// button 15 by default
function switchanchordefiningmode() {
  if (selectedtile != [] && selectedtile != undefined) {
    isDefininganchor = true;

    MapEditor.RightBarTextButton[14].toggle = "yes";
    MapEditor.RightBarTextButton[10].toggle = "no";
    isPaintorselected = false;
    MapEditor.RightBarTextButton[6].toggle = "no";
    isSelectorselected = false;
    MapEditor.RightBarTextButton[7].toggle = "no";
    isBrushmode = false;
    MapEditor.RightBarTextButton[8].toggle = "no";
    isSquaremode = false;
    MapEditor.RightBarTextButton[9].toggle = "no";
    isPasting = false;
    MapEditor.RightBarTextButton[15].toggle = "no";
    isPastingL = false;
    MapEditor.RightBarTextButton[17].toggle = "no";
    customrepeatplay(UItogglesound);
    alert(
      "The next click on a tile will define the anchor for the current selection"
    );
  }
}

function handleCopymodecleanup(e) {
  if (isDefininganchor === true) {
    isDefininganchor = false;
    MapEditor.RightBarTextButton[14].toggle = "no";
    MapEditor.RightBarTextButton[10].toggle = "yes";
  }
  customrepeatplay(UIphotosound);
  RightBarActionMapEditor(e);
}

// button 16 by default
function switchpastingmode() {
  if (tempclipboard != [] && tempclipboard != undefined) {
    isPasting = true;
    MapEditor.RightBarTextButton[15].toggle = "yes";
    MapEditor.RightBarTextButton[10].toggle = "no";
    customrepeatplay(UItogglesound);
    alert("Each click will now paste the last element added to the clipboard");

    isPaintorselected = false;
    MapEditor.RightBarTextButton[6].toggle = "no";
    isSelectorselected = false;
    MapEditor.RightBarTextButton[7].toggle = "no";
    isBrushmode = false;
    MapEditor.RightBarTextButton[8].toggle = "no";
    isSquaremode = false;
    MapEditor.RightBarTextButton[9].toggle = "no";
    isDefininganchor = false;
    MapEditor.RightBarTextButton[14].toggle = "no";
    isPastingL = false;
    MapEditor.RightBarTextButton[17].toggle = "no";
  }
}

//button17 by default

function changeclipboardelement(c) {}

// button 18 by default
function switchpastingmodelayered() {
  if (tempclipboard != [] && tempclipboard != undefined) {
    isPastingL = true;
    MapEditor.RightBarTextButton[17].toggle = "yes";
    MapEditor.RightBarTextButton[10].toggle = "no";
    customrepeatplay(UItogglesound);
    alert(
      "Each click will now paste the last element added to the clipboard on a layer"
    );

    isPasting = false;
    MapEditor.RightBarTextButton[15].toggle = "no";
    isPaintorselected = false;
    MapEditor.RightBarTextButton[6].toggle = "no";
    isSelectorselected = false;
    MapEditor.RightBarTextButton[7].toggle = "no";
    isBrushmode = false;
    MapEditor.RightBarTextButton[8].toggle = "no";
    isSquaremode = false;
    MapEditor.RightBarTextButton[9].toggle = "no";
    isDefininganchor = false;
    MapEditor.RightBarTextButton[14].toggle = "no";
  }
}

//button19 by default

function changedestinationlayer() {
  destinationlayer = LetUserinputdestinationlayer(MapEditor.destinationlayer);
  return destinationlayer
}
