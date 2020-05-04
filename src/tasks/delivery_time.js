const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  answer = `O tempo médio de entrega é ${data.delivery_time} dias`;

  const qa = await QA.create({ question, answer });

  return answer;
};
