STATE = {status:"loading",control:"mouse"};
let seed = Math.floor((Date.now() - 1000000000000 * 1.673) * 0.0005) % 100000;

// The following lane are used to initialize the main canvas1 logic of tracking clicks.


const canvas = document.querySelector("#canvas1");
const container = document.querySelector("#container");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1048); // should be the same as value in style.CSS
const CANVAS_HEIGHT = (canvas.height = 600); // should be the same as value in style.CSS
let mouse = { x: CANVAS_WIDTH * 0.5, y: CANVAS_HEIGHT * 0.5 };
let charpos = { x: CANVAS_WIDTH * 0.5, y: CANVAS_HEIGHT * 0.5 };
let gameFrame = 0;

// Those lanes are used to initialize the program

// annoyingly global
// was placed here to make sure it was loaded before other things need rework
// was placed here to make sure it was loaded before other things need rework
// was placed here to make sure it was loaded before other things need rework

let tilepixelsize = 16;
//for GUI purpose and prevent partially visible character, leave a padding for drawing tile on canvas
let VerticalOffset = (CANVAS_HEIGHT % (2 * tilepixelsize)) * 0.5;
let HorizontalOffset = (CANVAS_WIDTH % (2 * tilepixelsize)) * 0.5;
// Count how many rows and columns of tile can fit
let TileRow = (CANVAS_HEIGHT - VerticalOffset * 2) / tilepixelsize;
let TileColumn = (CANVAS_WIDTH - HorizontalOffset * 2) / tilepixelsize;
// was placed here to make sure it was loaded before other things need rework
// was placed here to make sure it was loaded before other things need rework
// was placed here to make sure it was loaded before other things need rework

// some useful functions requiring previous data are defined here to be used later

// Translate clickevent coordinate into canvas coordinate
// current function in use
function CanvasCoordinateTranslation(clickevent, canvas) {
  let canvasElem = canvas;
  let rect = canvasElem.getBoundingClientRect();
  let x = clickevent.clientX - rect.left;
  let y = clickevent.clientY - rect.top;
  //console.log("Coordinate x: " + x, "Coordinate y: " + y);

  return { x: x, y: y };
}

// Test if click belong to canvas1
// The 5 comes from stupid CSS
function TestClickAllowedCanvas1(
  clickedobject,
  HorizontalOffset,
  VerticalOffset
) {
  if (HorizontalOffset != 0 || VerticalOffset != 0) {
    if (
      clickedobject.x - (HorizontalOffset+5)>= 0 &&
      clickedobject.x - (HorizontalOffset+5)<=
        CANVAS_WIDTH-((2*HorizontalOffset)+5)  &&
      clickedobject.y - VerticalOffset>= 0 &&
      clickedobject.y - VerticalOffset<=
        CANVAS_HEIGHT 
    ) {
      return { x: clickedobject.x, y: clickedobject.y };
    }
  } else if (HorizontalOffset === 0  && VerticalOffset === 0) {
    if (
      clickedobject.x >= 0 &&
      clickedobject.x <= CANVAS_WIDTH &&
      clickedobject.y >= 0 &&
      clickedobject.y <= CANVAS_HEIGHT
    ) {
      return { x: clickedobject.x, y: clickedobject.y };
    }
  } else {
    console.log("false wrong click location");
    return false;
  }
}
// Return tile ID from canvas coodinate
// Accounting for the normal offset
// AND ALSO ACCOUNTING FOR THE 5 PIXEL BORDER FROM THE FUCKING CSS
function WhichTileisClicked(clickedobject, HorizontalOffset, VerticalOffset) {
  let u = Math.floor((clickedobject.x - (HorizontalOffset + 5)) * 0.0625);
  let v = Math.floor((clickedobject.y - (VerticalOffset + 5)) * 0.0625);
  return 64 * v + u;
}

// Create // modify a global variable that is an object embedding tile rules
function CreateTilingDescriptor(
  TileColumn,
  TileRow,
  tilepixelsize,
  HorizontalOffset,
  VerticalOffset
) {
  CurrentlyDisplayedTiling = {
    TileColumn: TileColumn,
    TileRow: TileRow,
    tilepixelsize: tilepixelsize,
    HorizontalOffset: HorizontalOffset,
    VerticalOffset: VerticalOffset,
  };
}

// Test if a rectangle object is clicked
// given a clickedobject with x and y coordinate, and testedobject,
// with
//.px for x-coordinate in pixel
//.py for y-coordinate in pixel
//.pw for width of item in pixel
//.py for height of the item in pixel
function Didsomeoneclicked(clickedobject, testedobject) {
  if (
    clickedobject.x >= testedobject.px &&
    clickedobject.x <= testedobject.px + testedobject.pw &&
    clickedobject.y >= testedobject.py &&
    clickedobject.y <= testedobject.py + testedobject.ph
  ) {
    return true;
  } else return false;
}




// load custom fonts
async function loadFonts() {
  const fontlist = [new FontFace("PixelCowboy","url(Fonts/PixelCowboy-l7we.ttf)"),
  new FontFace("PixelPublic","url(Fonts/PublicPixel-z84yD.ttf)"),
  new FontFace("OEGPR1","url(Fonts/OldEnglishGothicPixelRegular-gx1jp.otf)"),
  new FontFace("OEGPR2","url(Fonts/OldEnglishGothicPixelRegular-ow2Bo.ttf)"),
  new FontFace("ScarletDevil","url(Fonts/ScarletDevilPixelScript-0Vjr.ttf)")]
  // wait for font to be loaded

  // add font to document
  for (let i=0;i<fontlist.length-1;i++){
    await fontlist[i].load();
  document.fonts.add(fontlist[i]);}
  // enable font with CSS class
  document.body.classList.add("fonts-loaded");
}
loadFonts();


