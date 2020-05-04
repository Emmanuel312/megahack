const routes = require("express").Router();
const webhook = require("./controllers/webhook");
const answerController = require("./controllers/answerController");

routes.get("/send", async (req, res) => {
  try {
    const response = await req.twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+558195270711",
      body: "Enviando mensagem do bot para o cliente",
    });

    return res.json({ response });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

routes.post("/", webhook.ollie);

// custom answers
routes.get("/answer", answerController.index);
routes.post("/answer", answerController.store);
routes.put("/answer", answerController.update);

module.exports = routes;
