const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  if (data.nfc == true) {
    answer = "Sim, emitimos nota fiscal!";
  } else {
    answer = "Não emitimos nota fiscal!";
  }

  const qa = await QA.create({ question, answer });
  console.log(qa);
  return answer;
};
