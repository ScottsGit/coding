function compareGrid(g, p, idxR, idxC) {
  for (let i = idxR; i < p.length + idxR; i++) {
    for (let j = idxC; j < p[0].length + idxC; j++) {
      if (g[i][j] !== p[i - idxR][j - idxC]) return false;
    }
  }
  return true;
}
function gridSearch(G, P) {
  // Write your code here
  for (let i = 0; i < G.length; i++) {
    for (let j = 0; j < G[0].length; j++) {
      if (G[i][j] === P[0][0]) {
        // console.log(i, j)
        if (compareGrid(G, P, i, j)) {
          return "YES";
        }
      }
    }
  }
  return "NO";
}
