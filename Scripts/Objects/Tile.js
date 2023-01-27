// Class tile
// canvasx is left most area of the tile in pixel
// canvasy is the top most area of the tile in pixel
// tilex is the column index of the tile, starting with 0 for the first column, then 1, then 2 then 3
// tiley is the row index of the tile, starting with 0 for the first row/lane, then 1 then 2 then 3
// Ide is the identifier for the tile,
// first tile is 0:0 0:0 0 then 1:0 16:0 1 then 2:0 32:0 2
// or canvasx:0 canvasy:0 tilex:0 tiley:0 Ide:0

class Tile {
  constructor(canvasx, canvasy, tiley, tilex, Ide, forwhat) {
    this.canvasx = canvasx;
    this.canvasy = canvasy;
    this.tilex = tilex;
    this.tiley = tiley;
    this.Ide = Ide;
    this.clicked = "false";
    if (!forwhat) {
      this.forwhat = "default";
    } else {
      this.forwhat = forwhat;
    }
  }

  // poor way of detecting which tile is clicked
  TisclickedT(x, y, HorizontalOffset, VerticalOffset) {
    if (HorizontalOffset || VerticalOffset != 0) {
      x -= 0.5 * HorizontalOffset;
      y -= 0.5 * VerticalOffset;
    }
    if (
      x - this.canvasx >= 0 &&
      x - this.canvasx < tilepixelsize &&
      y - this.canvasy >= 0 &&
      y - this.canvasy < tilepixelsize
    ) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }
}

// ootch ugly save format
function recreateTileArray(savedmaparray,TileArray,purpose){
  for (let i =0; i<savedmaparray.length;i++){

    let forwhat = {
      purpose: purpose,
      tiletype: { tilesheet: savedmaparray[i].forwhat.tiletype.tilesheet, tilekey: savedmaparray[i].forwhat.tiletype.tilekey },
    };



  TileArray.push(
    new Tile(
      savedmaparray[i].canvasx,
      savedmaparray[i].canvasy,
      savedmaparray[i].tiley,
      savedmaparray[i].tilex,
      savedmaparray[i].Ide,
      forwhat      
    )
  )
}
}

function populateTileArray(TilingDescriptor, TileArray, forwhat) {
  // fills an array with all the tiles
  for (let i = 0; i < TilingDescriptor.TileRow; i++) {
    for (let j = 0; j < TilingDescriptor.TileColumn; j++) {
      TileArray.push(
        new Tile(
          TilingDescriptor.VerticalOffset + j * tilepixelsize,

          TilingDescriptor.HorizontalOffset + i * tilepixelsize,
          i,
          j,
          i * TilingDescriptor.TileColumn + j,
          forwhat
        )
      );
    }
  }
  //console.log(TileArray);
}

function drawStoredTileArray(TileSet, tileArray) {
  for (let i = 0; i < tileArray.length; i++) {
    ctx.drawImage(
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][0],
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][
        tileArray[i].forwhat.tiletype.tilekey
      ].px,
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][
        tileArray[i].forwhat.tiletype.tilekey
      ].py,
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][
        tileArray[i].forwhat.tiletype.tilekey
      ].pw,
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][
        tileArray[i].forwhat.tiletype.tilekey
      ].ph,
      tileArray[i].canvasx,
      tileArray[i].canvasy,
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][
        tileArray[i].forwhat.tiletype.tilekey
      ].pw,
      TileSet[tileArray[i].forwhat.tiletype.tilesheet][
        tileArray[i].forwhat.tiletype.tilekey
      ].ph
    );

    if (tileArray[i].layer !== undefined) {
      for (const [key, value] of Object.entries(tileArray[i].layer)) {
// destinationarray[id]["layer"] = { [`${destinationlayer}`] :[blocktodeploy.lookup[i][0],blocktodeploy.lookup[i][1]]};

          ctx.drawImage(
            TileSet[tileArray[i].layer[`${key}`][0]][0],
            TileSet[tileArray[i].layer[`${key}`][0]][
              tileArray[i].layer[`${key}`][1]
            ].px,
            TileSet[tileArray[i].layer[`${key}`][0]][
              tileArray[i].layer[`${key}`][1]
            ].py,
            TileSet[tileArray[i].layer[`${key}`][0]][
              tileArray[i].layer[`${key}`][1]
            ].pw,
            TileSet[tileArray[i].layer[`${key}`][0]][
              tileArray[i].layer[`${key}`][1]
            ].ph,
            tileArray[i].canvasx,
            tileArray[i].canvasy,
            TileSet[tileArray[i].layer[`${key}`][0]][
              tileArray[i].layer[`${key}`][1]
            ].pw,
            TileSet[tileArray[i].layer[`${key}`][0]][
              tileArray[i].layer[`${key}`][1]
            ].ph
          );
        }
      }
    }
  }

