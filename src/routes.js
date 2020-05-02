const routes = require("express").Router();
const webhook = require("./controllers/webhook");

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

routes.post("/", webhook.root);

module.exports = routes;
