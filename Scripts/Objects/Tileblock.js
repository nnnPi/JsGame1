class Tileblock {
  static Ide = 0;
  constructor(tilewidth, tileheight, anchorpoint, span, lookup) {
    this.tilew = tilewidth;
    this.tileh = tileheight;
    this.tilex = anchorpoint.tilex;
    this.tiley = anchorpoint.tiley;
    this.Ide = Tileblock.Ide++;
    this.span = span;
    this.lookup = lookup;
  }
}

function makeanewtileblock(selectedtile, tileobjectselectedasanchor) {
  // first let's scan the selection to detect the bounding box of the to be made block

  let futurespan = [];
  let futurelookup = [];
  let selectedarraywidth = 0;
  let selectedarrayheight = 0;

  let minx = "unset";
  let maxx = "unset";
  let miny = "unset";
  let maxy = "unset";

  for (let i = 0; i < selectedtile.length; i++) {
    let currentx = selectedtile[i].tilex;
    let currenty = tileEditor[selectedtile[i].Ide].tiley;
    if (minx === "unset") {
      minx = currentx;
      maxx = currentx;
      miny = currenty;
      maxy = currenty;
    } else {
      if (currentx < minx) {
        minx = currentx;
      }
      if (currentx > maxx) {
        maxx = currentx;
      }
      if (currenty < miny) {
        miny = currenty;
      }
      if (currenty > maxy) {
        maxy = currenty;
      }
    }

    // push  new & relative-to-the-anchor coordinate in the boudingbox

    futurespan.push([
      currentx - tileobjectselectedasanchor.tilex,
      currenty - tileobjectselectedasanchor.tiley,
    ]);
    futurelookup.push([
      selectedtile[i].forwhat.tiletype.tilesheet,
      selectedtile[i].forwhat.tiletype.tilekey,
    ]);
  }

  selectedarraywidth = 1 + maxx - minx;
  selectedarrayheight = 1 + maxy - miny;

  if(futurelookup.length+futurespan.length!==0){

  return new Tileblock(
    selectedarraywidth,
    selectedarrayheight,
    tileobjectselectedasanchor,
    futurespan,
    futurelookup
  );
}}
