// Main wrapper function used to fill the (right) bar with small buttons
// check canvas size, adjust the number of button accordingly
// check which button to display and where
// take care of changing the image to match the status
// also display text
// store the resulting right bar button composition in an array
function fillbarwithsmallbutton(
  canvas,
  buttonobjectset,
  staticobjectset,
  resultingarray
) {
  // is an array with a number of button, and a space available in pixel
  let numberthatactuallyfit = [
    getfloatnumberthatactuallyfit(canvas, buttonobjectset, staticobjectset)[0] +
      staticobjectset.length,
    getfloatnumberthatactuallyfit(canvas, buttonobjectset, staticobjectset)[1],
  ];

  // is an array with the Y position of each button
  let verticalspacingforbutton = computeverticalspacingforbutton(
    numberthatactuallyfit,
    canvas.height,
    buttonobjectset,
    staticobjectset
  );

  let realarrayofbutton = [];
  // those lane are used to put the following button in the top most position of the bar and not move from there
  realarrayofbutton.push(staticobjectset[2]);
  realarrayofbutton.push(staticobjectset[3]);
  realarrayofbutton.push(staticobjectset[0]);
  // used to place to other buttons under the previous static
  for (let i = 0; i <= numberthatactuallyfit[0] - staticobjectset.length; i++) {
    // make sure the last visible button is the down navigation arrow (staticobjectset[1])
    if (i === numberthatactuallyfit[0] - staticobjectset.length) {
      realarrayofbutton.push(staticobjectset[1]);
    } else {
      realarrayofbutton.push(buttonobjectset[i]);
    }
  }

  drawsmallbuttons(
    verticalspacingforbutton,
    realarrayofbutton,
    document.querySelector("#RightBarcanvas"),
    resultingarray
  );
}

//function used to compute the number of button that fit on a canvas
// return an array with the number of button and the amount of vertical space in pixel available to draw them
function getfloatnumberthatactuallyfit(
  canvas,
  buttonobjectset,
  staticobjectset
) {
  let spacetakenbystatic = 0;
  for (let i = 0; i < staticobjectset.length; i++) {
    spacetakenbystatic += staticobjectset[i].type.ph;
  }
  let spaceleft = canvas.height - spacetakenbystatic;
  let numberthatactuallyfit = 0;
  for (let i = 0; i < buttonobjectset.length; i++) {
    spaceleft -= buttonobjectset[i].type.ph;
    numberthatactuallyfit++;
    if (spaceleft < 0) {
      return [numberthatactuallyfit - 1, canvas.height - spacetakenbystatic];
    }
  }
  return [numberthatactuallyfit, canvas.height - spacetakenbystatic];
}
// function used to compute the vertical spacing between each button given their number
// return an array with the vertical position of each button in pixel
function computeverticalspacingforbutton(
  numberthatactuallyfit,
  heightofcanvas,
  buttonobjectset,
  staticobjectset
) {
  let numoffloat = numberthatactuallyfit[0] - staticobjectset.length;
  let spaceleftwtstatic = numberthatactuallyfit[1];

  let yposbuttonlist = [];
  let spacetakenbybutton = 0;
  let spaceavailable = heightofcanvas;

  for (let i = 0; i < numoffloat; i++) {
    spacetakenbybutton += buttonobjectset[i].type.ph;
  }

  spaceavailable =
    (spaceleftwtstatic - spacetakenbybutton) / (numberthatactuallyfit[0] - 1);

  for (let i = 0; i < numberthatactuallyfit[0]; i++) {
    if (i === 0) {
      yposbuttonlist.push(0);
    } else {
      if (i === 1) {
        let yposbutton =
          yposbuttonlist[i - 1] + spaceavailable + staticobjectset[0].type.ph;
        yposbuttonlist.push(yposbutton);
      } else {
        let yposbutton =
          yposbuttonlist[i - 1] + spaceavailable + buttonobjectset[0].type.ph;
        yposbuttonlist.push(yposbutton);
      }
    }
  }

  return yposbuttonlist;
}

// function used to compute the horizontal spacing to center text on button
// Does it work if the font can't load ?
function computehorizontalspacingforbutton(
  widthofcanvas,
  widthofbutton,
  txtobject,
  fontname,
  fontsize
) {
  txtobject.xoffset =
    0.5 *
    (widthofcanvas -
      widthofbutton +
      (widthofbutton -
        Math.floor(getWidthOfText(txtobject.string, fontname, fontsize))));
  return (
    0.5 *
    (widthofcanvas -
      widthofbutton +
      (widthofbutton -
        Math.floor(getWidthOfText(txtobject.string, fontname, fontsize))))
  );
}

// wrapper function that call the proper update for button, then the proper drawbackground and the proper drawtext for each button
// push each updated button object in an array
// Modify here to call new special update function when adding a new button that need one
function drawsmallbuttons(
  verticalspacingforbutton,
  realarrayofbutton,
  canvas,
  resultingarray
) {
  for (let i = 0; i < realarrayofbutton.length; i++) {
    resultingarray.push({
      ["button" + i]: realarrayofbutton[i],
    });

    let updatedbutton = {};
    updatedbutton = updatesmallbuttonstatus(
      resultingarray[i][`button${i}`],
      verticalspacingforbutton[i]
    );

    drawsmallbuttonbackground(canvas, updatedbutton);
    if (updatedbutton.type === TwoSideDispRB||updatedbutton.type===DispRB) {
      drawtextdisplay(canvas, updatedbutton);
    } else {
      drawsmallbuttontext(canvas, updatedbutton);
    }
  }
}

// wrapper function that update each button; or call the more specific update function for that button
// update is mostly changing the background if the button is toggled
// or updating the text fields when they are dynamic
// Modify here to catch the custom special behavior
function updatesmallbuttonstatus(button, verticalspacingforbutton) {
  button.py = verticalspacingforbutton;
  button.pw = button.type.pw;
  button.ph = button.type.ph;
  button.px = 0;

  if (button.text.static === "yes1") {
    button.specialYrowselection = button.type.sy[1];
    return button;
  }
  if (button.text.toggle === "yes") {
    button.specialYrowselection = button.type.sy[5];
    return button;
  }
  if (button.type === TwoSideDispRB|| button.type===DispRB) {
    return updatedisplay(button, verticalspacingforbutton);
  } else {
    button.specialYrowselection = button.type.sy[0];
  }

  return button;
}

// called by wrapper
// specific update function for non-standard button
// change text field for 2 sided display
function updatedisplay(button) {
  button.specialYrowselection = button.type.sy;
  if ( button.type===TwoSideDispRB){
  button.specialtxt = [
    "tile:" +  MapEditor.tiletopaint,
    "sheet:" + sheetselectedforeditor,
  ];}
  if( button.type ===DispRB){
    button.specialtxt = [     
      "elm" + "clipboard[i]",
      "layer:" + MapEditor.destinationlayer,
    ];
  }


  return button;
}

// called by wrapper
// draw the background image for button after it has been updated
function drawsmallbuttonbackground(canvas, buttonobject) {
  const localctx = canvas.getContext("2d");
  localctx.drawImage(
    buttonobject.type.img,
    buttonobject.type.sx,
    buttonobject.specialYrowselection,
    buttonobject.type.sw,
    buttonobject.type.sh,
    1,
    buttonobject.py,
    buttonobject.type.pw,
    buttonobject.type.ph
  );
}

// called by wrapper
// draw the text for button after it has been update
function drawsmallbuttontext(canvas, button) {
  button.style.posx = computehorizontalspacingforbutton(
    canvas.width,
    button.type.pw,
    button.text,
    button.style.font,
    4
  );

  const localctx = canvas.getContext("2d");
  localctx.save();

  localctx.fillStyle = button.style.fillStyle;
  localctx.font = button.style.font;
  localctx.fontWeight = button.style.fontWeight;
  localctx.fillText(button.text.string, button.style.posx, button.py + 18);

  localctx.restore();
}

// called by wrapper
// draw the text for specific display button after it has been updated
function drawtextdisplay(canvas, button) {
  // custom text added
  const localctx = canvas.getContext("2d");
  localctx.save();
  localctx.fillStyle = button.style.fillStyle;
  localctx.font = button.style.font;
  localctx.fontWeight = button.style.fontWeight;
  localctx.fillText(button.specialtxt[1], button.style.posx[0], button.py + 18);
  localctx.fillText(button.specialtxt[0], button.style.posx[1], button.py + 18);
  localctx.restore();
}

// function used only used to draw the mode selection buttons
// that's the one on which to test async because it need to wait for the font and images to be loaded before displaying
function drawbuttonmodeselection(buttonobjectdefinition) {
  ctx.drawImage(
    buttonobjectdefinition.img,
    buttonobjectdefinition.sx,
    buttonobjectdefinition.sy[0],
    buttonobjectdefinition.sw,
    buttonobjectdefinition.sh,
    15,
    10,
    buttonobjectdefinition.pw,
    buttonobjectdefinition.ph
  );

  ctx.drawImage(
    buttonobjectdefinition.img,
    buttonobjectdefinition.sx,
    buttonobjectdefinition.sy[2],
    buttonobjectdefinition.sw,
    buttonobjectdefinition.sh,
    529,
    10,
    buttonobjectdefinition.pw,
    buttonobjectdefinition.ph
  );

  //
  //  color: #18090b;
  //#8b4335
  //291516
  //#290f13"

  ctx.fillStyle = "#542920";
  ctx.font = "38px OEGPR2";
  ctx.fontWeight = 400;
  ctx.fillText("Play the Game", 100, 48);
  ctx.fillText("Map Editor", 670, 48);
}
