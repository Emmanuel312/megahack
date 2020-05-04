const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question) {
  try {
    let answer;
    const { data } = await axios.get(
      `http://localhost:3001/products/${product_id}`
    );

    if (data.made_in === "BR") {
      answer =
        "Olá, sou o Ollie e espero te ajudar! Esse produto é fabricado no Brasil.";
    } else {
      answer =
        "Olá, sou o Ollie e espero te ajudar! Esse produto não é fabricado no Brasil.";
    }

    const qa = await QA.create({ question, answer });
    console.log(qa);
    return answer;
  } catch (error) {
    console.log(error);
  }
};

function colorWithoutGender(color) {
  return color.slice(0, color.length - 1);
}
