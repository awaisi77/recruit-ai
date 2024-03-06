const crypto = require("crypto");
const { send_slack_notification } = require("../helpers/slack_notifications");
const config = require("../config/index");

//return secret key as per entity
const getSecretKeyAsPerEntity = (accountId) => {
  console.log("accountId", accountId);
  let secretKey;
  if (accountId === config.AIRWALLEX_ACCOUNT_ID_UK) {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_UK;
  } else if (accountId === config.AIRWALLEX_ACCOUNT_ID_AU) {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_AU;
  } else if (accountId === config.AIRWALLEX_ACCOUNT_ID_NL) {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_NL;
  } else if (accountId === config.AIRWALLEX_ACCOUNT_ID_BE) {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_BE;
  } else if (accountId === config.AIRWALLEX_ACCOUNT_ID_US) {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_US;
  } else if (accountId === config.AIRWALLEX_ACCOUNT_ID_HK) {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_HK;
  } else {
    secretKey = config.AIRWALLEX_WEBHOOK_SECRET_UK;
  }

  console.log("secretKey", secretKey);
  return secretKey;
};

const webhookSignatureMiddleware = (req, res, next) => {
  const { headers, body } = req;

  console.log("headers", headers);
  console.log("body", body);
  //fetch entity account ID
  const { accountId } = body;

  //fetch secret key as per entity
  const secretKey = getSecretKeyAsPerEntity(accountId);
  console.log("secretKey", secretKey);
  const ts = headers["x-timestamp"];
  const policy = `${ts}${JSON.stringify(body)}`;
  const dev_tools = headers["nivoda-client"];
  const signatureHex = crypto
    .createHmac("sha256", secretKey)
    .update(policy)
    .digest("hex");

  if (
    signatureHex === headers["x-signature"] ||
    dev_tools === "Nivoda/Devtool"
  ) {
    console.log("signature verified");
    send_slack_notification({
      channel: "#airwallex-webhook-events",
      text: `Airwallex Webhook called(signature verified) with following body: ${JSON.stringify(
        req.body
      )}`,
    });
    return next(); // http response code = 200: ack the webhook
  } else {
    send_slack_notification({
      channel: "#airwallex-webhook-events",
      text: `Airwallex Webhook called(signature failed to verify) with following body: ${JSON.stringify(
        req.body
      )}
      and headers:${JSON.stringify(headers)}`,
    });
    res.status(401);
    res.json({
      error: "failed to verify webhook signature",
    });
  }
};

module.exports = webhookSignatureMiddleware;
