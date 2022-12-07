const { Schema, model } = require("mongoose");
const QuestionSchema = new Schema({
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  tutorial: { type: String, default: null },
});

module.exports = model("Question", QuestionSchema);
