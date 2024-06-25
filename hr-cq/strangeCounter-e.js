function strangeCounter(t) {
  // Write your code here
  let value = 3,
    ratio = 2;
  let time = 1;

  while (true) {
    // calculate time in the cycle
    // time + value always === next cycle
    // in the cycle
    if (time <= t && time + value > t) {
      return time + value - t;
    } else {
      // updating cycle
      time += value;
    }
    // value for cycle
    value = value * ratio;
  }
}
