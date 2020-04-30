const twilio = require("twilio");

const twilioClient = twilio(
  process.env.TWILIO_ASID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = twilioClient;
