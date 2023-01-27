function customrepeatplay(targetArray) {
    if (!targetArray) {
      return;
    }
    let target = targetArray.find((sound) => !sound.busy);
    if (!target) {
      return;
    }
  
    target.busy = true;
    target.addEventListener("ended", setCanplay, false);
    target.play();
  }
  
  function customrandomplay(targetArray) {
    if (!targetArray) {
      return;
    }
    let notfound = true;
    let startscanindex = Math.pseudorandom(targetArray.length);
    while ((notfound = true)) {
      if (targetArray[startscanindex].busy !== true) {
        targetArray[startscanindex].busy = true;
        targetArray[startscanindex].addEventListener("ended", setCanplay, false);
        targetArray[startscanindex].play();
        notfound = false;
        break;
      } else startscanindex++;
      if (targetArray[startscanindex] >= targetArray.length) {
        startscanindex = 0;
      }
    }
  }
  
  function setCanplay(event) {
    event.target.removeEventListener("ended", setCanplay, false);
    event.target.busy = false;
  }
  
  function fadeout(intervalTicks, targetaudio, decrement) {
    const interval = setInterval(
      () => {
        if (targetaudio.volume >= decrement) {
          targetaudio.volume -= decrement;
        } else {
          clearInterval(interval);
          targetaudio.pause();
          targetaudio.currentTime =0;
          targetaudio.busy=false;        
        }
      },
      intervalTicks,
      targetaudio
    );
  }
  
  