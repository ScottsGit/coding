function recurPermutation(n, idx, comb = []) {
  if (comb.length === 2) return [comb];

  const allCombs = [];
  for (let i = idx; i <= n; i++) {
    allCombs.push(...recurPermutation(n, i + 1, [...comb, i]));
  }
  return allCombs;
}
function mutualTopicCount(topic, comb) {
  let count = 0;
  const t1 = topic[comb[0] - 1];
  const t2 = topic[comb[1] - 1];
  for (let i = 0; i < t1.length; i++) {
    if (t1[i] === "1" || t2[i] === "1") count++;
  }
  return count;
}

function acmTeam(topic) {
  // Write your code here
  // permutation problem 1 w/ 2,3, 2 w/ 3
  const n = topic.length;
  const m = topic[0].length;
  // get all permutation
  const allPermutations = recurPermutation(n, 1);
  console.log(allPermutations);

  // loop to find 1.maxTopics, 2.num of teams to it
  const hash = {};
  let maxTopics = 0;
  for (let e of allPermutations) {
    const topicCount = mutualTopicCount(topic, e);
    maxTopics = Math.max(maxTopics, topicCount);
    if (!hash[topicCount]) {
      hash[topicCount] = [e];
    } else {
      hash[topicCount].push(e);
    }
  }

  return [maxTopics, hash[maxTopics].length];
}
