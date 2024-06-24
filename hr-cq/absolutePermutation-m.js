function absolutePermutation(n, k) {
  // Write your code here
  if (k === 0)
    return Array(n)
      .fill()
      .map((_, i) => i + 1);

  const hash = new Map();
  for (let i = 1; i <= n; i++) {
    // k - i, k + i
    if (k - i < 0 && !hash.get(i - k)) {
      hash.set(i - k, i);
    } else if (!hash.get(k + i)) {
      hash.set(k + i, i);
    }
  }

  const values = hash.values();
  for (let e of values) {
    if (!hash.has(e)) return [-1];
  }

  const newHash = new Map(Array.from(hash).sort((a, b) => a[0] - b[0]));
  return Array.from(newHash.values());
}
