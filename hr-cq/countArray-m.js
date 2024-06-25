function countArray(n, k, x) {
    // Return the number of ways to fill in the array.
    const mod = 1e9 + 7;
    const dp = Array(n + 1).fill().map(() => Array(k + 1).fill(0));
    dp[1][1] = 1;
    console.log(dp)
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= k; j++) {
            dp[i][j] = 0;
            for (let m = 1; m <= k; m++) {
                if (m != j) {
                    dp[i][j] = (dp[i][j] + dp[i-1][m]) % mod;
                }
            }
            console.log(dp)
        }
    }
    return dp[n][x];
}
