const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  if (data.original === true) {
    answer = `Olá, sou o Ollie e espero te ajudar! Sim o produto é original!`;
  } else {
    answer = `Olá, sou o Ollie e espero te ajudar! Não, o produto não é original.`;
  }
  const qa = await QA.create({ question, answer });
  console.log(qa);
  return answer;
};
