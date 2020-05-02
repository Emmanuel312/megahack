const storage = require("../tasks/storage");
const select_color = require("../tasks/select_color");
const water_prof = require("../tasks/water_prof");
const nfc = require("../tasks/nfc");
const delivery_time = require("../tasks/delivery_time");

module.exports = {
  async root(req, res) {
    const { product_id, seller_id, query } = req.body;

    const response = await req.twilioClient.autopilot
      .assistants(process.env.TWILIO_ASSISTANT_SID)
      .queries.create({ language: "en-US", query });
    console.log(response);
    if (response.results.task === "storage") {
      const message = await storage(product_id, query);
      return res.json({ message });
    }
    if (response.results.task === "water_prof") {
      const message = await water_prof(product_id, query);
      return res.json({ message });
    }
    if (response.results.task === "nfc") {
      const message = await nfc(product_id, query);
      return res.json({ message });
    }
    if (response.results.task === "delivery_time") {
      const message = await delivery_time(product_id, query);
      return res.json({ message });
    }
    if (response.results.task === "select_color") {
      const message = await select_color(
        product_id,
        query,
        response.results.fields[0].value
      );
      return res.json({ message });
    }

    return res.status(400).json({
      message:
        "O ollie não conseguiu entender, redirecione manualmente para o vendedor",
    });
  },
};
