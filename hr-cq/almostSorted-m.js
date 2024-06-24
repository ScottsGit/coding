function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}
function swap(arr, i, j) {
  const swapped = [...arr];
  const temp = swapped[i];
  swapped[i] = swapped[j];
  swapped[j] = temp;
  return swapped;
}
function reverse(arr, i, j) {
  const reversed = [...arr];
  let left = i,
    right = j;
  while (left < right) {
    const temp = reversed[left];
    reversed[left] = reversed[right];
    reversed[right] = temp;
    left++;
    right--;
  }
  return reversed;
}

function almostSorted(arr) {
  // Write your code here
  // determin the arr is sorted
  // if not
  // swap sort
  // if not
  // reverse sort
  if (isSorted(arr)) return "yes";

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // swap i, j
      const swappedArr = swap(arr, i, j);
      if (isSorted(swappedArr)) {
        console.log("yes");
        console.log("swap %i %j", i + 1, j + 1);
        return;
      }
      // reverse i to j
      const reversedArr = reverse(arr, i, j);
      if (isSorted(reversedArr)) {
        console.log("yes");
        console.log("reverse %i %j", i + 1, j + 1);
        return;
      }
    }
  }

  console.log("no");
}
