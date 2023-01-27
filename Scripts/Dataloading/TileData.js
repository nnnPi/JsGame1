let TileSpriteSourceImage = [];
let TileSet = [];

// the plan ( cuttingplan or scheme) is defined first as a reference, then some images are defined to be sent to cut according to plan
// result is stored in an array, under the form of different object
//
// to access data TileSet[i][0] => this is the image
// to access data TileSet[i][0].tilesize
// to access data TileSet[i][j].px
// to access data TileSet[i][j].py
// to access data TileSet[i][j].pw
// to access data TileSet[i][j].ph
//
//
// a plan consist into a tile size in pixel, which is used to locate the top left corner of a tile
// starting with 0*tilesize 0*tilesize
// a tile number that is the total number of tile the plan is going to create
// the w and h are used to describe how many tile should be cut to form 1 consistent image
// for example x:5 y:4 means the top left of an image is located in the 5th column 4rth row starting from 0
// for example w:2 h:3 means an piece of image that is a rectangle covering 2 tile in width, and 3 tile in height
// 5:{ x:0,y:2,w:1,h:1} means the 6th tile of the tileset to make should be a tilesize*tilesize image
//where the top left corner is in the first column, 3rd row.
/**/

// handtyped cuttingplans
const cuttingplan = {
  plan1: {
    tilesize: 16,
    tilenumber: 81,
    tile: {
      0: { x: 0, y: 0, w: 1, h: 1 },
      1: { x: 0, y: 1, w: 1, h: 1 },
      2: { x: 0, y: 2, w: 1, h: 1 },
      3: { x: 1, y: 0, w: 1, h: 1 },
      4: { x: 1, y: 1, w: 1, h: 1 },
      5: { x: 1, y: 2, w: 1, h: 1 },
      6: { x: 2, y: 0, w: 1, h: 1 },
      7: { x: 3, y: 0, w: 1, h: 1 },
      8: { x: 4, y: 0, w: 1, h: 1 },
      9: { x: 2, y: 1, w: 1, h: 1 },
      10: { x: 3, y: 1, w: 1, h: 1 },
      11: { x: 4, y: 1, w: 1, h: 1 },
      12: { x: 2, y: 2, w: 1, h: 1 },
      13: { x: 3, y: 2, w: 1, h: 1 },
      14: { x: 4, y: 2, w: 1, h: 1 },
      15: { x: 0, y: 3, w: 1, h: 1 },
      16: { x: 1, y: 3, w: 1, h: 1 },
      17: { x: 0, y: 4, w: 1, h: 1 },
      18: { x: 1, y: 4, w: 1, h: 1 },
      19: { x: 0, y: 5, w: 1, h: 1 },
      20: { x: 1, y: 5, w: 1, h: 1 },
      21: { x: 0, y: 6, w: 1, h: 1 },
      22: { x: 1, y: 6, w: 1, h: 1 },
      23: { x: 0, y: 7, w: 1, h: 1 },
      24: { x: 1, y: 7, w: 1, h: 1 },
      25: { x: 0, y: 8, w: 1, h: 1 },
      26: { x: 1, y: 8, w: 1, h: 1 },
      27: { x: 0, y: 9, w: 1, h: 1 },
      28: { x: 1, y: 9, w: 1, h: 1 },
      29: { x: 2, y: 7, w: 1, h: 1 },
      30: { x: 3, y: 7, w: 1, h: 1 },
      31: { x: 4, y: 7, w: 1, h: 1 },
      32: { x: 2, y: 8, w: 1, h: 1 },
      33: { x: 3, y: 8, w: 1, h: 1 },
      34: { x: 4, y: 8, w: 1, h: 1 },
      35: { x: 2, y: 9, w: 1, h: 1 },
      36: { x: 3, y: 9, w: 1, h: 1 },
      37: { x: 4, y: 9, w: 1, h: 1 },
      38: { x: 5, y: 7, w: 1, h: 1 },
      39: { x: 6, y: 7, w: 1, h: 1 },
      40: { x: 7, y: 7, w: 1, h: 1 },
      41: { x: 5, y: 8, w: 1, h: 1 },
      42: { x: 6, y: 8, w: 1, h: 1 },
      43: { x: 7, y: 8, w: 1, h: 1 },
      44: { x: 5, y: 9, w: 1, h: 1 },
      45: { x: 6, y: 9, w: 1, h: 1 },
      46: { x: 7, y: 9, w: 1, h: 1 },
      47: { x: 0, y: 10, w: 1, h: 1 },
      48: { x: 1, y: 10, w: 1, h: 1 },
      49: { x: 2, y: 10, w: 1, h: 1 },
      50: { x: 3, y: 10, w: 1, h: 1 },
      51: { x: 4, y: 10, w: 1, h: 1 },
      52: { x: 4, y: 11, w: 1, h: 1 },
      53: { x: 4, y: 12, w: 1, h: 1 },
      54: { x: 0, y: 11, w: 1, h: 1 },
      55: { x: 1, y: 11, w: 1, h: 1 },
      56: { x: 0, y: 12, w: 1, h: 1 },
      57: { x: 1, y: 12, w: 1, h: 1 },
      58: { x: 0, y: 13, w: 1, h: 1 },
      59: { x: 1, y: 13, w: 1, h: 1 },
      60: { x: 0, y: 14, w: 1, h: 1 },
      61: { x: 1, y: 14, w: 1, h: 1 },
      62: { x: 2, y: 11, w: 1, h: 1 },
      63: { x: 3, y: 11, w: 1, h: 1 },
      64: { x: 2, y: 12, w: 1, h: 1 },
      65: { x: 3, y: 12, w: 1, h: 1 },
      66: { x: 2, y: 13, w: 1, h: 1 },
      67: { x: 3, y: 13, w: 1, h: 1 },
      68: { x: 5, y: 10, w: 1, h: 1 },
      69: { x: 6, y: 10, w: 1, h: 1 },
      70: { x: 7, y: 10, w: 1, h: 1 },
      71: { x: 5, y: 11, w: 1, h: 1 },
      72: { x: 6, y: 11, w: 1, h: 1 },
      73: { x: 7, y: 11, w: 1, h: 1 },
      74: { x: 5, y: 12, w: 1, h: 1 },
      75: { x: 6, y: 12, w: 1, h: 1 },
      76: { x: 7, y: 12, w: 1, h: 1 },
      77: { x: 2, y: 3, w: 2, h: 2 },
      78: { x: 2, y: 5, w: 2, h: 2 },
      79: { x: 5, y: 1, w: 4, h: 3 },
      80: { x: 5, y: 4, w: 4, h: 3 },
    },
  },
  plan2: {
    tilesize: 16,
    tilenumber: 81,
    tile: {
      0: { x: 0, y: 0, w: 1, h: 1 },
      1: { x: 0, y: 1, w: 1, h: 1 },
      2: { x: 0, y: 2, w: 1, h: 1 },
      3: { x: 1, y: 0, w: 1, h: 1 },
      4: { x: 1, y: 1, w: 1, h: 1 },
      5: { x: 1, y: 2, w: 1, h: 1 },
      6: { x: 2, y: 0, w: 1, h: 1 },
      7: { x: 3, y: 0, w: 1, h: 1 },
      8: { x: 4, y: 0, w: 1, h: 1 },
      9: { x: 2, y: 1, w: 1, h: 1 },
      10: { x: 3, y: 1, w: 1, h: 1 },
      11: { x: 4, y: 1, w: 1, h: 1 },
      12: { x: 2, y: 2, w: 1, h: 1 },
      13: { x: 3, y: 2, w: 1, h: 1 },
      14: { x: 4, y: 2, w: 1, h: 1 },
      15: { x: 0, y: 3, w: 1, h: 1 },
      16: { x: 1, y: 3, w: 1, h: 1 },
      17: { x: 0, y: 4, w: 1, h: 1 },
      18: { x: 1, y: 4, w: 1, h: 1 },
      19: { x: 0, y: 5, w: 1, h: 1 },
      20: { x: 1, y: 5, w: 1, h: 1 },
      21: { x: 0, y: 6, w: 1, h: 1 },
      22: { x: 1, y: 6, w: 1, h: 1 },
      23: { x: 0, y: 7, w: 1, h: 1 },
      24: { x: 1, y: 7, w: 1, h: 1 },
      25: { x: 0, y: 8, w: 1, h: 1 },
      26: { x: 1, y: 8, w: 1, h: 1 },
      27: { x: 0, y: 9, w: 1, h: 1 },
      28: { x: 1, y: 9, w: 1, h: 1 },
      29: { x: 2, y: 7, w: 1, h: 1 },
      30: { x: 3, y: 7, w: 1, h: 1 },
      31: { x: 4, y: 7, w: 1, h: 1 },
      32: { x: 2, y: 8, w: 1, h: 1 },
      33: { x: 3, y: 8, w: 1, h: 1 },
      34: { x: 4, y: 8, w: 1, h: 1 },
      35: { x: 2, y: 9, w: 1, h: 1 },
      36: { x: 3, y: 9, w: 1, h: 1 },
      37: { x: 4, y: 9, w: 1, h: 1 },
      38: { x: 5, y: 7, w: 1, h: 1 },
      39: { x: 6, y: 7, w: 1, h: 1 },
      40: { x: 7, y: 7, w: 1, h: 1 },
      41: { x: 5, y: 8, w: 1, h: 1 },
      42: { x: 6, y: 8, w: 1, h: 1 },
      43: { x: 7, y: 8, w: 1, h: 1 },
      44: { x: 5, y: 9, w: 1, h: 1 },
      45: { x: 6, y: 9, w: 1, h: 1 },
      46: { x: 7, y: 9, w: 1, h: 1 },
      47: { x: 0, y: 10, w: 1, h: 1 },
      48: { x: 1, y: 10, w: 1, h: 1 },
      49: { x: 2, y: 10, w: 1, h: 1 },
      50: { x: 3, y: 10, w: 1, h: 1 },
      51: { x: 4, y: 10, w: 1, h: 1 },
      52: { x: 4, y: 11, w: 1, h: 1 },
      53: { x: 4, y: 12, w: 1, h: 1 },
      54: { x: 0, y: 11, w: 1, h: 1 },
      55: { x: 1, y: 11, w: 1, h: 1 },
      56: { x: 0, y: 12, w: 1, h: 1 },
      57: { x: 1, y: 12, w: 1, h: 1 },
      58: { x: 0, y: 13, w: 1, h: 1 },
      59: { x: 1, y: 13, w: 1, h: 1 },
      60: { x: 0, y: 14, w: 1, h: 1 },
      61: { x: 1, y: 14, w: 1, h: 1 },
      62: { x: 2, y: 11, w: 1, h: 1 },
      63: { x: 3, y: 11, w: 1, h: 1 },
      64: { x: 2, y: 12, w: 1, h: 1 },
      65: { x: 3, y: 12, w: 1, h: 1 },
      66: { x: 2, y: 13, w: 1, h: 1 },
      67: { x: 3, y: 13, w: 1, h: 1 },
      68: { x: 5, y: 10, w: 1, h: 1 },
      69: { x: 6, y: 10, w: 1, h: 1 },
      70: { x: 7, y: 10, w: 1, h: 1 },
      71: { x: 5, y: 11, w: 1, h: 1 },
      72: { x: 6, y: 11, w: 1, h: 1 },
      73: { x: 7, y: 11, w: 1, h: 1 },
      74: { x: 5, y: 12, w: 1, h: 1 },
      75: { x: 6, y: 12, w: 1, h: 1 },
      76: { x: 7, y: 12, w: 1, h: 1 },
      77: { x: 2, y: 3, w: 2, h: 2 },
      78: { x: 2, y: 5, w: 2, h: 2 },
      79: { x: 5, y: 1, w: 4, h: 3 },
      80: { x: 5, y: 4, w: 4, h: 3 },
    },
  },
  plan3: {
    tilesize: 16,
    tilenumber: 2,
    tile: {
      0: { x: 0, y: 0, w: 1, h: 1 },
      1: { x: 1, y: 0, w: 1, h: 1 },
    },
  },
  plan4: {
    tilesize: 16,
    tilenumber: 2,
    tile: {
      0: { x: 0, y: 0, w: 1, h: 1 },
      1: { x: 1, y: 0, w: 1, h: 1 },
    },
  },
};

// function made to cut the first tropical sprite
//
function createtropicalcuttingplan() {
  let tile = {};
  for (let i = 0; i <= 11; i++) {
    for (let j = 0; j <= 29; j++) {
      let id = i * 30 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 360,
    tile,
  };
}
// used to give the result of the function as plan
const tropicalplan = createtropicalcuttingplan();
// merge it with other plan
cuttingplan.tropicalplan = tropicalplan;

function createinsidecuttingplan() {
  let tile = {};
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 5; j++) {
      let id = i * 6 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 60,
    tile,
  };
}
const insideplan = createinsidecuttingplan();
cuttingplan.insideplan = insideplan;

function createdunjailplan() {
  let tile = {};
  for (let i = 0; i <= 34; i++) {
    for (let j = 0; j <= 35; j++) {
      let id = i * 36 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 1260,
    tile,
  };
}
const dunjailplan = createdunjailplan();
cuttingplan.dunjailplan = dunjailplan;

function createCLDemoplan() {
  let tile = {};
  for (let i = 0; i <= 30; i++) {
    for (let j = 0; j <= 39; j++) {
      let id = i * 40 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 1240,
    tile,
  };
}
const CLDemoplan = createCLDemoplan();
cuttingplan.CLDemoplan = CLDemoplan;

function createWLDemoplan() {
  let tile = {};
  for (let i = 0; i <= 25; i++) {
    for (let j = 0; j <= 39; j++) {
      let id = i * 40 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 1040,
    tile,
  };
}
const WLDemoplan = createWLDemoplan();
cuttingplan.WLDemoplan = WLDemoplan;

function createspreadunjailplan() {
  let tile = {};
  for (let i = 0; i <= 34; i++) {
    for (let j = 0; j <= 63; j++) {
      let id = i * 64 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 2240,
    tile,
  };
}
const spreadunjailplan = createspreadunjailplan();
cuttingplan.spreadunjailplan = spreadunjailplan;

function createdecodunjailplan() {
  let tile = {};
  for (let i = 0; i <= 15; i++) {
    for (let j = 0; j <= 15; j++) {
      let id = i * 16 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 256,
    tile,
  };
}
const decodunjailplan = createdecodunjailplan();
cuttingplan.decodunjaillplan = decodunjailplan;

function createfences1plan() {
  let tile = {};
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 11; j++) {
      let id = i * 12 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 72,
    tile,
  };
}
const fences1plan = createfences1plan();
cuttingplan.fences1lplan = fences1plan;





function createRockTestplan() {
  let tile = {};
  for (let i = 0; i <= 31; i++) {
    for (let j = 0; j <= 63; j++) {
      let id = i * 64 + j;
      tile[id] = { x: j, y: i, w: 1, h: 1 };
      //console.log(tile)
    }
  }
  return {
    tilesize: 16,
    tilenumber: 2048,
    tile,
  };
}
const RockTestplan = createRockTestplan();
cuttingplan.RockTestplan= RockTestplan;


// sprite image on the file system, and description on how to cut them and identify each piece with a number
// need to be defined once the plan are made, maybe not ideal
const TileSpriteSourceList = [
  {
    name: "spring",
    src: "Images/Tiles/spring tilemap.png",
    scheme: cuttingplan.plan1,
  },
  {
    name: "summer",
    src: "Images/Tiles/summer tilemap.png",
    scheme: cuttingplan.plan1,
  },
  {
    name: "autumn",
    src: "Images/Tiles/autumn tilemap.png",
    scheme: cuttingplan.plan1,
  },
  {
    name: "winter",
    src: "Images/Tiles/winter tilemap.png",
    scheme: cuttingplan.plan1,
  },
  { name: "inside", src: "Images/Tiles/inside.png", scheme: insideplan },
  { name: "tropical", src: "Images/Tiles/tropical.png", scheme: tropicalplan },
  {
    name: "alignedunjail",
    src: "Images/Tiles/alignedunjail.png",
    scheme: dunjailplan,
  },
  { name: "CLDemo", src: "Images/Tiles/CLDemo.png", scheme: CLDemoplan },
  { name: "WLDEMO", src: "Images/Tiles/WLDEMO.png", scheme: WLDemoplan },
  {
    name: "spreaddunjail",
    src: "Images/Tiles/spreadunjail.png",
    scheme: spreadunjailplan,
  },
  {
    name: "decodunjail",
    src: "Images/Tiles/decodunjail.png",
    scheme: decodunjailplan,
  },
  { name: "fences1", src: "Images/Tiles/fences1.png", scheme: fences1plan },
  { name: "RockTest", src: "Images/Tiles/RockTest.png", scheme: RockTestplan },
];

// a loop to load the real image into an array as the first element of another array with the property tilesize stored there
for (let i = 0; i < TileSpriteSourceList.length; i++) {
  TileSet.push(new Array());
  TileSet[i].push(new Image());
  TileSet[i][0].src = TileSpriteSourceList[i].src;
  TileSet[i][0].tilesize = TileSpriteSourceList[i].scheme.tilesize;

  // +1 -1 to j are to account for the first element being an image an not a tile
  // load the rest of the data from the plan and scaling it

  for (let j = 1; j < TileSpriteSourceList[i].scheme.tilenumber + 1; j++) {
    TileSet[i].push(new Object(TileSpriteSourceList[i].scheme.tile[j - 1]));

    TileSet[i][j].px =
      TileSpriteSourceList[i].scheme.tile[j - 1].x *
      TileSpriteSourceList[i].scheme.tilesize;
    TileSet[i][j].py =
      TileSpriteSourceList[i].scheme.tile[j - 1].y *
      TileSpriteSourceList[i].scheme.tilesize;
    TileSet[i][j].pw =
      TileSpriteSourceList[i].scheme.tile[j - 1].w *
      TileSpriteSourceList[i].scheme.tilesize;
    TileSet[i][j].ph =
      TileSpriteSourceList[i].scheme.tile[j - 1].h *
      TileSpriteSourceList[i].scheme.tilesize;
  }
}

//console.log(TileSet);
/* console.log(TileSet[0][1].x)
console.log(TileSet[0][1].y)
console.log(TileSet[0][1].w)
console.log(TileSet[0][1].h)
console.log(TileSet[0][0]) */

// function to create a tilingdescriptor used to create a tileArray for scene that require one
function FabricateTilingDescriptor(tilepixelsize, canvas, offset) {
  let resultingobject = new Object();
  resultingobject.tilepixelsize = tilepixelsize;
  if (offset) {
    resultingobject.VerticalOffset =
      (canvas.height % (2 * resultingobject.tilepixelsize)) * 0.5;
    resultingobject.HorizontalOffset =
      (canvas.width % (2 * resultingobject.tilepixelsize)) * 0.5;
  } else {
    resultingobject.VerticalOffset = 0;
    resultingobject.HorizontalOffset = 0;
  }
  resultingobject.TileRow =
    (canvas.height - resultingobject.VerticalOffset * 2) /
    resultingobject.tilepixelsize;
  resultingobject.TileColumn =
    (canvas.width - resultingobject.HorizontalOffset * 2) /
    resultingobject.tilepixelsize;
  //console.log(resultingobject);
  return resultingobject;
}
