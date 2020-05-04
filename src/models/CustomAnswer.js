const { Schema, model } = require("mongoose");

const CustomAnswerSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("CustomAnswer", CustomAnswerSchema);
