  //console.log(xorShift(seed)%10)
  export const randomnumbertestarray =  [0,0,0,0,0,0,0,0,0,0]

  
  seed = xorShift(seed);
  switch(xorShift(seed)%10){
    case 0 :randomnumbertestarray[0]+=1
    break;
    case 1 :randomnumbertestarray[1]+=1
    break;
    case 2 :randomnumbertestarray[2]+=1
    break;
    case 3 :randomnumbertestarray[3]+=1
    break;
    case 4 :randomnumbertestarray[4]+=1
    break;
    case 5 :randomnumbertestarray[5]+=1
    break;
    case 6 :randomnumbertestarray[6]+=1
    break;
    case 7 :randomnumbertestarray[7]+=1
    break;
    case 8 :randomnumbertestarray[8]+=1
    break;
    case 9 :randomnumbertestarray[9]+=1
    break;
  }
  if (randomnumbertestarray[0]%10===0){
  console.log(randomnumbertestarray)}


  
 /*  last element to the first place
  arr.unshift(arr.pop());
  first element to the last place
  arr.push(arr.shift()) */




  class MyAudio extends Audio {
    isPlaying = false;
    
    constructor(src) {
    super(src);
    this.addEventListener('ended', () => {
    this.isPlaying = false;
    })
    }
    play() {
    super.play();
    this.isPlaying = true;
    }
    }
    
    const sounds = [new MyAudio('idk'), new MyAudio('idk')];
    
    const nonPlayingSound = sounds.find(sound => !sound.isPlaying);