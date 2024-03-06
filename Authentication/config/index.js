const logger = require("../utils/logger");
const config = {};
config.ignore_permissions =
  (process.env.ignore_permissions &&
    process.env.ignore_permissions == "true") ||
  false;
config.port = process.env.port || 4008;
config.integration_service = process.env.integration_service;
config.run_migration =
  process.env.hasOwnProperty("run_migration") &&
  process.env.run_migration == "false"
    ? false
    : true;
config.getJsonFromEnv = (name) => {
  try {
    if (process.env[name]) {
      const obj = JSON.parse(process.env[name]);
      logger.info(`Picking ${name} from config`);
      return obj;
    }
  } catch (e) {
    logger.warn(`Unable to pick ${name} information from config`);
    logger.error(e.stack);
  }
  return null;
};

if (
  process.env.QUEUE_ENABLED &&
  process.env.QUEUE_ENABLED !== "undefined" &&
  process.env.QUEUE_ENABLED !== "false"
) {
  config.QUEUEING_ENABLED = true;
  config.REDIS_URI_BULL = process.env.REDIS_URI_BULL;
}
config.WORKER_CONCURRENCY = process.env.WORKER_CONCURRENCY || 5;
config.WORKER_RATE_LIMITING = process.env.WORKER_RATE_LIMITING || 20;
config.FAILED_JOB_ATTEMPTS = process.env.FAILED_JOB_ATTEMPTS || 3;
config.EXPONENTIAL_BACKOFF = process.env.EXPONENTIAL_BACKOFF || 2000;
// config.MAIN_QUEUE_NAME = process.env.MAIN_QUEUE_NAME || "AIRWALLEX_MAIN_QUEUE";
config.ADMIN_USER = process.env.ADMIN_USER;
config.ADMIN_PASS = process.env.ADMIN_PASS;
// config.AIRWALLEX_WEBHOOK_SECRET = process.env.AIRWALLEX_WEBHOOK_SECRET;
config.INTEGRATION_SERVICE = process.env.graphql_service;
config.INTEGRATION_SERVICE_ADMIN = process.env.integration_service;


module.exports = config;
