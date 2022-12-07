const QuestionModel = require("../model/QuestionModel");
const aws = require("aws-sdk");
const { isValidObjectId } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

aws.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "ap-south-1",
});

const uploadFile = async function (file) {
  return new Promise(function (resolve, reject) {
    const s3 = new aws.S3({ apiVersion: "2006-03-01" });
    const uploadParams = {
      ACL: "public-read",
      Bucket: "my-video-bucket-for-project",
      Key: `QuestionApp/${file.originalname}`,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      return resolve(data.Location);
    });
  });
};
const { isValid } = require("../validations/validations");
exports.createQuestion = async (req, res) => {
  try {
    const { question, option1, option4, option3, option2, correctAnswer } =
      req.body;
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({ status: false, message: "Body should not be empty" });
    }
    const { files } = req;
    let uploaded = null;
    if (files.length) {
      const fileType = files[0].mimetype;
      if (fileType !== "image/jpeg" && fileType !== "video/mp4") {
        return res
          .status(400)
          .json({ status: false, message: "This file is not allowed" });
      }
      uploaded = await uploadFile(files[0]);
    }
    if (!isValid(question))
      return res.status(400).json({
        status: false,
        message: "quetion should not be empty",
      });
    const isQuestionExist = await QuestionModel.findOne({ question });
    if (isQuestionExist)
      return res.status(400).json({
        status: false,
        message: "This question is already being used",
      });
    if (!isValid(option1))
      return res.status(400).json({
        status: false,
        message: "Option 1 should not be empty",
      });
    if (!isValid(option2))
      return res.status(400).json({
        status: false,
        message: "Option 2 should not be empty",
      });
    if (!isValid(option3))
      return res.status(400).json({
        status: false,
        message: "Option 3  should not be empty",
      });
    if (!isValid(option4))
      return res.status(400).json({
        status: false,
        message: "Option 4 should not be empty",
      });
    if (!isValid(correctAnswer))
      return res.status(400).json({
        status: false,
        message: "correctAnswer  should not be empty",
      });
    if (
      correctAnswer !== option4 &&
      correctAnswer !== option3 &&
      correctAnswer !== option2 &&
      correctAnswer !== option1
    )
      return res.status(400).json({
        status: false,
        message: "correctAnswer  should should match one value",
      });
    const questionCreated = await QuestionModel.create({
      question,
      option1,
      option4,
      option3,
      option2,
      correctAnswer,
      tutorial: uploaded,
    });
    res
      .status(201)
      .json({ status: true, message: "Success", data: questionCreated });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const tenQuestions = await QuestionModel.aggregate([
      { $sample: { size: 10 } },
    ]);
    res
      .status(200)
      .json({ status: true, message: "Success", data: tenQuestions });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "id is invalid",
      });
    }

    const { question, option1, option4, option3, option2, correctAnswer } =
      req.body;
    if (question) {
      if (!isValid(question))
        return res.status(400).json({
          status: false,
          message: "quetion should not be empty",
        });
      const isQuestionExist = await QuestionModel.findOne({ question });
      if (isQuestionExist)
        return res.status(400).json({
          status: false,
          message: "This question is already being used",
        });
    }
    if (option1) {
      if (!isValid(option1))
        return res.status(400).json({
          status: false,
          message: "Option 1 should not be empty",
        });
    }
    if (option2) {
      if (!isValid(option2))
        return res.status(400).json({
          status: false,
          message: "Option 2 should not be empty",
        });
    }
    if (option3) {
      if (!isValid(option3))
        return res.status(400).json({
          status: false,
          message: "Option 3 should not be empty",
        });
    }
    if (option4) {
      if (!isValid(option4))
        return res.status(400).json({
          status: false,
          message: "option 4  should not be empty",
        });
    }
    if (correctAnswer) {
      if (!isValid(correctAnswer))
        return res.status(400).json({
          status: false,
          message: "correctAnswer should not be empty",
        });
    }
    const { files } = req;
    let uploaded = null;
    if (files.length) {
      const fileType = files[0].mimetype;
      console.log(fileType);
      if (
        fileType !== "image/jpeg" &&
        fileType !== "video/mp4" &&
        fileType !== "image/png"
      ) {
        return res
          .status(400)
          .json({ status: false, message: "This file is not allowed" });
      }
      uploaded = await uploadFile(files[0]);
    }
    const questionUpdated = await QuestionModel.findOneAndUpdate(
      { id },
      {
        question,
        option1,
        option4,
        option3,
        option2,
        correctAnswer,
        tutorial: uploaded,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ status: false, message: "Success", data: questionUpdated });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
