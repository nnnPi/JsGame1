// Make this script active only when called from ModeSelection
document.addEventListener("MapEditorMode", (mem) => {
  // Prevent the call from ModeSelection to continue occuring once this script is active
  document.removeEventListener("click", GameModeselector, true);
  MapEditor = {};

  // create an object associating some mapeditor functions to some buttons and their text
  MapEditor.RightBarTextButton = makefunctionlistRB("init");
  // create an object referencing the navigation button and their function
  MapEditor.RightBarstaticButton = makestaticlistRB("init");

  MapEditor.buttonsfunctionlist = makefunctionlistRB("objectlistplz");
  MapEditor.buttonsstaticlist = makestaticlistRB("objectlistplz");
  MapEditor.RightBarTextButton.ident = 0;
  MapEditor.destinationlayer = 20;  
  MapEditor.tiletopaint = 19;
  sheetselectedforeditor = 2;
  MapEditor.rightbardrawnbuttons = [];
  MapEditor.numberofbuttontodraw =
    MapEditor.RightBarTextButton.length + MapEditor.RightBarstaticButton.length;
  fillbarwithsmallbutton(
    RightBarcanvas,
    MapEditor.buttonsfunctionlist,
    MapEditor.buttonsstaticlist,
    MapEditor.rightbardrawnbuttons
  );

  // Add even listener only for RightBarcanvas
  RightBarcanvas.addEventListener("click", RightBarActionMapEditor, true);
});

// Define the action to take depending on context
function RightBarActionMapEditor(erb) {
  let clicked = CanvasCoordinateTranslation(erb, RightBarcanvas);

  // Check if one of the drawn button location is clicked
  // If so
  // Call the function associated with the button in RightBarfunction.js
  for (let i = 0; i < MapEditor.rightbardrawnbuttons.length; i++) {
    if (
      Didsomeoneclicked(
        clicked,
        MapEditor.rightbardrawnbuttons[i][`button${i}`]
      ) === true
    ) {      
      MapEditor.rightbardrawnbuttons[i][`button${i}`].action(clicked);
    }
  }

  // Draw as much buttons as can fit according to the defintions and texts in RightBarData.js made into an object in RighBarfunction.js
  MapEditor.rightbardrawnbuttons = [];
  ctxRB.clearRect(0, 0, CANVAS_WIDTH_RB, CANVAS_HEIGHT_RB);
  fillbarwithsmallbutton(
    RightBarcanvas,
    MapEditor.buttonsfunctionlist,
    MapEditor.buttonsstaticlist,
    MapEditor.rightbardrawnbuttons
  );
}

function RightBarActionMainLoop(erb) {
  let clicked = CanvasCoordinateTranslation(erb, RightBarcanvas);
  if (STATE.status === "MainLoop") {
    // function ok
    //alert("MainLoop");
    //console.log("i did a thing3")
  }
}

function RightBarActionCharacterSelection(erb) {
  if (STATE.status === "CharacterSelection") {
    // function ok
    //alert("MainLoop");
    //console.log("i did a thing3")
  }
}
