const request = require("request");

const CHANNELS = {
  "#staging-notifications":
    "https://hooks.slack.com/services/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"
};

const send_slack_notification = async ({ channel, text }) => {
  // use slack channels for production env and "staging-notifications" channel for staging notifications
  let ch =
    process.env.WDC_ENV === "production"
      ? CHANNELS[channel]
      : CHANNELS["#staging-notifications"];

  if (!ch) {
    console.error("[slack] Missing channel.");
    return true;
  }

  if (!text) {
    console.error("[slack] Missing text.");
    return true;
  }

  if (process.env.NODE_ENV === "production") {
    try {
      request.post({
        url: ch,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          text: text,
        },
        json: true,
      });
    } catch (e) {
      console.error("[slack] could not send slack message: ", e);
      return true;
    }
  } else {
    console.log({
      url: ch,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        text: text,
      },
      json: true,
    });
  }
  return true;
};

module.exports = {
  send_slack_notification,
};
