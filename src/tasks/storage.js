const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  if (data.quantity > 0) {
    answer = `Ola, ainda temos ${data.quantity} disponiveis`;
  } else {
    answer = `Ola, acabou o estoque`;
  }
  const qa = await QA.create({ question, answer });
  console.log(qa);
  return answer;
};
