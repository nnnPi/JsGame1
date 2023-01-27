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
    return button
  }
  if(button.type===TwoSideDispRB){
   return updatedisplay(button, verticalspacingforbutton)
  }
   else {
    button.specialYrowselection = button.type.sy[0];
  }

  return button;
}

function updatedisplay(button, verticalspacingforbutton){
  

  button.specialYrowselection = button.type.sy;
  button.specialtxt = ["tile:"+tiletopaint,"sheet:"+sheetselectedforeditor];

  return button
}




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
    if (updatedbutton.type=== TwoSideDispRB)
    {
      drawtextdisplay(canvas, updatedbutton);
   //   console.log("yo2");
    }else{
    drawsmallbuttontext(canvas, updatedbutton);
    }
  }
}

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
function drawtextdisplay(canvas, button){
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

//function used to compute the number of button that fit on a canvas
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

// function used to fill the bar with small buttons
// check canvas size, adjust the number of button accordingly
// also display text
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
  realarrayofbutton.push(staticobjectset[2]);
  realarrayofbutton.push(staticobjectset[0]);

  for (let i = 0; i <= numberthatactuallyfit[0] - staticobjectset.length; i++) {
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
