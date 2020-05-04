const CustomAnswer = require("../models/CustomAnswer");

module.exports = {
  async store(req, res) {
    try {
      const { task, answer } = req.body;
      const customAnswer = await CustomAnswer.create({ task, answer });
      res.json({ customAnswer });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async update(req, res) {
    try {
      const { task, answer } = req.body;
      const customAnswer = await CustomAnswer.findOne({ task });
      customAnswer.answer = answer;
      await customAnswer.save();
      res.json({ customAnswer });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async index(req, res) {
    const customAnswers = await CustomAnswer.find({});

    res.json(customAnswers);
  },
};
