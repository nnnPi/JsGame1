// is launched only after character selection has happened
document.addEventListener("PlayerSelected", (e) => {
  // document.removeEventListener("click", selector, true);
  
  STATE.status = "MainLoop";
  STATE.control = "Keyboard";

  // DOM element which needs to enter fullscreen mode
  document.querySelector("html").requestFullscreen();
  //ok with body
  // create big mess when used with #container
  // create offset when used with #canvas1
  // has no background when used with body which is the only difference with pressing F11

  // seems to be sufficient to prevent most default shortcuts
  // example F5 will not refresh page but can be use to cast spell
  // 4 ' is not going to trigger research on mozilla
  document.addEventListener("keydown", function (e) {
    e.preventDefault();
    // console.log(e);
  });

  setInterval(animate, refreshtimer);
  // main loop

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    seed = xorShift(seed);

    //update player
    //draw player

    player.forEach((element) => {
      element.updateP(element);
      element.drawP(element);
    });

    //update animals
    //draw animals

    animal.forEach((element) => {
      element.updateA(element);
      element.drawA(element);
    });

    //grow plants
    //draw plants
    plant.forEach((element) => {
      element.growP(element);
      element.drawP(element);
    });

    gameFrame++;
  }
});
