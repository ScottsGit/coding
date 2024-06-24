let arr, fac, mod, M;

function initialize(s) {
  const maximum = 26; // Assuming `maximum` is defined somewhere in the Python code
  M = 1000000007;
  const n = s.length;
  arr = Array.from({ length: maximum }, () => Array(n + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < maximum; j++) {
      arr[j][i + 1] = arr[j][i] + (s.charCodeAt(i) - 97 === j ? 1 : 0);
    }
  }

  fac = new Array(n + 1).fill(1);
  mod = new Array(n + 1).fill(1);
  for (let i = 1; i <= n; i++) {
    fac[i] = (fac[i - 1] * i) % M;
    mod[i] = modInverse(fac[i], M);
  }
}

function modInverse(a, m) {
  return powMod(a, m - 2, m);
}

function powMod(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

function answerQuery(l, r) {
  const maximum = 26; // Assuming `maximum` is defined somewhere in the Python code
  let odd = 0;
  let even = 0;
  let divs = 1;

  for (let i = 0; i < maximum; i++) {
    let value = arr[i][r] - arr[i][l - 1];
    odd += value & 1;
    even += Math.floor(value / 2);
    divs = (divs * mod[Math.floor(value / 2)]) % M;
  }

  let result = (fac[even] * divs) % M;
  if (odd > 0) {
    result = (result * odd) % M;
  }

  return result;
}
