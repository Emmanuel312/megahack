const axios = require("axios");
const QA = require("../models/QA");
const CustomAnswer = require("../models/CustomAnswer");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  const customAnswer = await CustomAnswer.findOne({ task: "Nota fiscal" });

  if (data.nfc === true) {
    answer = customAnswer.answer;
  } else {
    answer = "Olá, sou o Ollie e espero te ajudar! Nao emitimos nota fiscal";
  }

  const qa = await QA.create({ question, answer });

  return answer;
};
