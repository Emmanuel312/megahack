const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  if (data.quantity > 0) {
    answer = `Olá, sou o Ollie e espero te ajudar! Ainda temos ${data.quantity} disponíveis.`;
  } else {
    answer = `Olá, sou o Ollie e espero te ajudar! Acabou o estoque.`;
  }
  const qa = await QA.create({ question, answer });

  return answer;
};
