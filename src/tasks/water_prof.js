const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  if (data.water_prof === true) {
    answer = "Olá, o produto é a prova d'agua";
  } else {
    answer = "Olá, o produto não é a prova d'agua";
  }

  const qa = await QA.create({ question, answer });

  return answer;
};
