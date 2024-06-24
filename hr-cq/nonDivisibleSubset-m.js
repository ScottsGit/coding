///////////////////////////////////

function nonDivisibleSubset(k, s) {
  const remainderCount = new Array(k).fill(0);

  // Count the frequency of each remainder
  for (const number of s) {
    remainderCount[number % k]++;
  }

  // Initialize max subset size with at most one 0 remainder element
  let maxSubsetSize = Math.min(remainderCount[0], 1);

  // Loop from 1 to k/2 (inclusive)
  for (let r = 1; r <= Math.floor(k / 2); r++) {
    if (r !== k - r) {
      maxSubsetSize += Math.max(remainderCount[r], remainderCount[k - r]);
    } else {
      maxSubsetSize += Math.min(remainderCount[r], 1);
    }
  }

  return maxSubsetSize;
}
