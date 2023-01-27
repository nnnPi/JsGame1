function GameModeselector(es) {
  drawbuttonmodeselection(menubutton612px);
  let clicked = CanvasCoordinateTranslation(es, canvas);

  if (clicked.x < CANVAS_WIDTH * 0.5 && clicked.y < 65 && clicked.x >= 0) {
    selectedmode1 = new CustomEvent("GameMode", {
      detail: {
        ready: "true",
      },
    });
    document.dispatchEvent(selectedmode1);
  }
  if (
    clicked.x > CANVAS_WIDTH * 0.5 &&
    clicked.y < 65 &&
    clicked.x <= CANVAS_WIDTH
  ) {
    selectedmode2 = new CustomEvent("MapEditorMode", {
      detail: {
        ready: "true",
      },
    });
    document.dispatchEvent(selectedmode2);
  }
}
