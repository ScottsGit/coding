export const sleep = async (ms: number): Promise<NodeJS.Timer> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

if (!connection.isConnected) {
  // Throttle retry
  await sleep(500); // eslint-disable-line
}
