const QA = require("../models/QA");

module.exports = async function(question) {
  let answer;

  answer =
    "Olá, sou o Ollie e espero te ajudar! Sim, o produto é de qualidade.";

  const qa = await QA.create({ question, answer });

  return answer;
};
