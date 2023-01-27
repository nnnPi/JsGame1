// top secret random number generator
// this is updated in game loop
function xorShift(seed) {
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return seed < 0 ? ~seed + 1 : seed; //2's complement of the negative result to make all numbers positive.
}

// function to get a random number between 0 and a

Math.pseudorandom = function (a) {
  return seed % a;
};

// transform value to fit interval if need be
Math.clamp = function (min, max, value) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
};

// Linear interpolation between 2 value according to amount between 0 and 1
Math.lerp = function (value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return (1 - amount) * value1 + amount * value2;
};

// same accepting negative value for extrapolation
Math.lexp = function (a, b, t) {
  return (1 - t) * a + b * t;
};

// inverse linear interpolation
Math.invlerp = function (a, b, v) {
  return (v - a) / (b - a);
};

// remap a v belonging to min1-max1 to its equivalent between min2-max2
Math.remap = function (min1, max1, min2, max2, v) {
  let t = Math.invlerp(min1, max1, v);
  return Math.lexp(min2, max2, t);
};


// function to get the width of a text in pixel
function getWidthOfText(txt, fontname, fontsize) {
  if (getWidthOfText.c === undefined) {
    getWidthOfText.c = document.createElement("canvas");
    getWidthOfText.ctx = getWidthOfText.c.getContext("2d");
  }
  var fontspec = fontsize + " " + fontname;
  if (getWidthOfText.ctx.font !== fontspec) getWidthOfText.ctx.font = fontspec;
  return getWidthOfText.ctx.measureText(txt).width;
}