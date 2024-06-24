function getMatrixDimension(s) {
  let len = Math.floor(Math.sqrt(s.length));
  let m = len;
  let n = len + 1;
  if (m * n < s.length) {
    m = n = len + 1;
  } else if (Math.sqrt(s.length) % 1 === 0) {
    m = n = Math.sqrt(s.length);
  }
  return [m, n];
}
// Complete the encryption function below.
function encryption(s) {
  let [m, n] = getMatrixDimension(s);
  let strindex = 0;
  let grid = [];
  for (let i = 0; i < m; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = s[strindex] || "";
      strindex++;
    }
  }
  let out = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      out += grid[j][i];
    }
    out += " ";
  }
  return out;
}
