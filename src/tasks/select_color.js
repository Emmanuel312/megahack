const axios = require("axios");
const QA = require("../models/QA");

module.exports = async function(product_id, question, color) {
  try {
    let answer;
    const { data } = await axios.get(
      `http://localhost:3001/products/${product_id}`
    );

    const colorItem = data.colors.find(
      (item) => colorWithoutGender(item.color) === colorWithoutGender(color)
    );
    if (!colorItem || colorItem.quantity === 0) {
      answer = `Olá, o estoque da cor ${color} acabou :c`;
    } else {
      answer = `Olá, ainda temos ${colorItem.quantity} unidades da cor ${color}`;
    }
    const qa = await QA.create({ question, answer });

    return answer;
  } catch (error) {
    console.log(error);
  }
};

function colorWithoutGender(color) {
  return color.slice(0, color.length - 1);
}
