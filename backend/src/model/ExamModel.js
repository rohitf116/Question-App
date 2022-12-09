const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ExamSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    answer1: { type: String, required: true, default: null },
    correctAnswer1: { type: String, required: true },
    answer2: { type: String, required: true, default: null },
    correctAnswer2: { type: String, required: true },
    answer3: { type: String, required: true, default: null },
    correctAnswer3: { type: String, required: true },
    answer4: { type: String, required: true, default: null },
    correctAnswer4: { type: String, required: true },
    answer5: { type: String, required: true, default: null },
    correctAnswer5: { type: String, required: true },
    answer6: { type: String, required: true, default: null },
    correctAnswer6: { type: String, required: true },
    answer7: { type: String, required: true, default: null },
    correctAnswer7: { type: String, required: true },
    answer8: { type: String, required: true, default: null },
    correctAnswer8: { type: String, required: true },
    answer9: { type: String, required: true, default: null },
    correctAnswer9: { type: String, required: true },
    answer10: { type: String, required: true, default: null },
    correctAnswer10: { type: String, required: true },
    marks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Exam", ExamSchema);
