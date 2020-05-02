require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Translate } = require("@google-cloud/translate").v2;
const axios = require("axios");

const app = express();

const translate = new Translate();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

async function detectLanguage(text) {
  try {
    let [detections] = await translate.detect(text);
    detections = Array.isArray(detections) ? detections : [detections];
    return detections[0].language;
  } catch (err) {
    console.log(err);
  }
}

async function translateText(text, language) {
  try {
    const translatedText = await translate.translate(text, language);
    return translatedText;
  } catch (e) {
    console.log(e);
  }
}

app.post("/send-message", async (req, res) => {
  try {
    const assistantSid = process.env.TWILIO_ASSISTANT_SID;
    const accountSid = process.env.TWILIO_ASID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const url = `https://channels.autopilot.twilio.com/v2/${accountSid}/${assistantSid}/custom/chat`;
    const translatedText = await translateText(req.body.message, "en");
    const originalLanguage = await detectLanguage(req.body.message);
    const request = `UserId=Test123&Language=en-US&Text=${translatedText[0]}`;
    const chat = await axios.post(url, request, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json",
        authorization:
          "Basic " +
          new Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
      },
    });
    const responseText = chat.data.response.says[0].text;
    const finalResponseChat = await translateText(
      responseText,
      originalLanguage
    );
    return res.send(finalResponseChat[0]).status(200);
  } catch (err) {
    console.log(err);
    return res.send(err.message).status(500);
  }
});

app.listen(3000, () => console.log("Server start on port 3030"));
