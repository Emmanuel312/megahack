const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question, color) {
  try {
    let answer;
    const { data } = await axios.get(
      `http://localhost:3001/products/${product_id}`
    );
    console.log(data.colors);

    const colorItem = data.colors.find(
      (item) => colorWithoutGender(item.color) === colorWithoutGender(color)
    );
    if (!colorItem || colorItem.quantity === 0) {
      answer = `Olá, o estoque da cor ${color} acabou :c`;
    } else {
      answer = `Olá, ainda temos ${colorItem.quantity} unidades da cor ${color}`;
    }
    const qa = await QA.create({ question, answer });
    console.log(qa);
    return answer;
  } catch (error) {
    console.log(error);
  }
};

// https://i.4cdn.org/gif/1588365559963.webm
//https://i.4cdn.org/gif/1588373504382.webm
//https://i.4cdn.org/gif/1588234139209.webm
//https://i.4cdn.org/gif/1588273640227.webm
//https://i.4cdn.org/gif/1588367572758.webm
//https://i.4cdn.org/gif/1588375067858.webm

function colorWithoutGender(color) {
  return color.slice(0, color.length - 1);
}
