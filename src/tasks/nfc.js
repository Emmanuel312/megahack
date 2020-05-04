const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  let answer;
  const { data } = await axios.get(
    `http://localhost:3001/products/${product_id}`
  );

  if (data.nfc === true) {
    answer =
      "Olá, sou o Ollie e espero te ajudar! Emitimos nota fiscal, enviamos por e-mail e junto com o produto.";
  } else {
    answer =
      "Olá, sou o Ollie e espero te ajudar! Emitimos nota fiscal após contabilizar o pagamento do pedido.";
  }

  const qa = await QA.create({ question, answer });
  console.log(qa);
  return answer;
};
