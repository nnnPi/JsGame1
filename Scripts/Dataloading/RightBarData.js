// The following lane are used to initialize the Right bar logic of tracking clicks.

const RightBarcanvas = document.querySelector("#RightBarcanvas");
const containerRB = document.querySelector("#rightbar");
const ctxRB = RightBarcanvas.getContext("2d");
const CANVAS_WIDTH_RB = (RightBarcanvas.width = 140); // should be the same as value in style.CSS
const CANVAS_HEIGHT_RB = (RightBarcanvas.height = 600); // should be the same as value in style.CSS

// define text for buttons
// starting with static buttons : 
const UParrow = {
  string: " ",
  xoffset: 0,
  static: "yes0",
};
const Downarrow = {
  string: " ",
  xoffset: 0,
  static: "yes1",
};
const RBbutton20SheetTileDisplay = {
  string: " ",
  xoffset: 0,
  static: "yes3",
};
const RBbutton21LayerDisplay ={
  string: " ",
  xoffset: 0,
  static: "yes4",
};


const RBbutton1SelectSpriteSheet = {
  string: "Select SpriteSheet",
  xoffset: 0,
};
const RBbutton2SeletTile = {
  string: "Select Tile",
  xoffset: 0,
};
const RBbutton3DrawSpriteSheet = {
  string: "Draw spritesheet",
  xoffset: 0,
};
const RBbutton4DeleteAllTiles = {
  string: "Delete All Tiles",
  xoffset: 0,
};
const RBbutton5Unselecttext = {
  string: "Cancel Selection",
  xoffset: 0,
};
const RBbutton6Transformselecttext = {
  string: "Transform Selection",
  xoffset: 0,
};
const RBbutton7PaintorTool = {
  string: "Paintor tool",
  xoffset: 0,
  toggle: "no",
};
const RBbutton8SelectorTool = {
  string: "Selector tool",
  xoffset: 0,
  toggle: "no",
};
const RBbutton9BrushMode = {
  string: "Brush mode",
  xoffset: 0,
  toggle: "no",
};
const RBbutton10RectangleMode = {
  string: "Rectangle mode",
  xoffset: 0,
  toggle: "no",
};
const RBbutton11NomodeNotool = {
  string: "No mode No tool",
  xoffset: 0,
  toggle: "yes",
};
const RBbutton12ConsoleLog = {
  string: "Console log map",
  xoffset: 0,
};
const RBbutton13Print = {
  string: "Print number",
  xoffset: 0,
  toggle: "no",
};
const RBbutton14DelecteSelected = {
  string: "Delete Selected Tile",
  xoffset: 0,
};
const RBbutton15CopySelected = {
  string: "Copy Selection",
  xoffset: 0,
  toggle: "no",
};
const RBbutton16PasteMode = {
  string: "Paste mode",
  xoffset: 0,
  toggle: "no",
};
const RBbutton17ChangeElement = {
  string: "Change Element",
  xoffset: 0,
};
const RBbutton18PasteLayered = {
  string: "Paste on Layer",
  xoffset: 0,
  toggle: "no",
};
const RBbutton19ChangeDestinationLayer = {
  string: "Change Layer",
  xoffset: 0,
};



// buttonstyledefinition
const smallbuttonRBtstyle = {
  fillStyle: "#623436",
  font: "16px Impact",
  fontWeight: 50,
  posx: 0,
  posy: 0,
};

// buttonobjectdefinition
const smallbuttonRB = {
  img: buttons112px,
  sx: 0,
  sy: [0, 31, 63, 95, 127, 159],
  sw: 112,
  sh: 31,
  pw: 138,
  ph: 27,
};

// buttonobjectdefinition
const smalltoggleRB = {
  img: buttons112px,
  sx: 0,
  sy: [0, 31, 63, 95, 127, 159],
  sw: 112,
  sh: 31,
  pw: 138,
  ph: 27,
};

// buttonobjectdefinition
const verticalArrowRB = {
  img: buttons112px,
  sx: 0,
  sy: [191, 223],
  sw: 112,
  sh: 31,
  pw: 138,
  ph: 27,
};

// buttonobjectdefinition
const TwoSideDispRB = {
  img: buttons112px,
  sx: 0,
  sy: 321,
  sw: 112,
  sh: 31,
  pw: 138,
  ph: 27,
};

// buttonstyledefinition
const TwoSideDispRBtstyle = {
  fillStyle: "#623436",
  font: "14px Impact",
  fontWeight: 50,
  posx: [5, 70],
  posy: 0,
};

// buttonobjectdefinition
const DispRB = {
  img: buttons112px,
  sx: 0,
  sy: 321,
  sw: 112,
  sh: 31,
  pw: 138,
  ph: 27,
};

// buttonstyledefinition
const DispRBtstyle = {
  fillStyle: "#623436",
  font: "14px Impact",
  fontWeight: 50,
  posx: [5, 70],
  posy: 0,
};

