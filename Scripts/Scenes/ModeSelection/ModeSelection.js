// Menu to choose between game and map editor
STATE.status = "modeSelection";

const menubutton612px = {
  img: buttons612px,
  sx: 0,
  sy: [0, 31, 63, 95, 127, 159],
  sw: 612,
  sh: 31,
  pw: 504,
  ph: 56,
};
// sy : 0 , 32 or 64 gets +96 when activating
// sw sh size of source image in pixel, width height
// pw px size of destination in pixel, width height to be used to detect clik
drawbuttonmodeselection(menubutton612px);

// eventlistener that activate the switch of mode.
document.addEventListener("click", GameModeselector, true, { once: true });

// basic click on left side to play, right side for tile editor
// click at the top too quickly made before i think of a real button class for the sidebar
