const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "authElasticSearchServer",
  "debug"
); // combine with winston-elaticsearch which prints in console and elastic

const isTestEnv = process.env.NODE_ENV === "test";

export const logger = {
  info: (context: any, message?: string) => {
    if (!isTestEnv) console.log(context, message);
    log.info(
      `AuthService Elasticsearch health status - ${health.status.toUpperCase()}`
    );
  },
  warn: (context: any, message?: string) => {
    if (!isTestEnv) console.log(context, message);
  },
  error: (err: Error, message?: string) => {
    if (!isTestEnv) console.error(err, message);
    log.error("AuthService - Connection to Elasticsearch failed. Retrying...");
  },
};
