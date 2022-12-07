const ExamModel = require("../model/ExamModel");
const UserModel = require("../model/UserModel");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
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
exports.giveExam = async (req, res) => {
  try {
    let user;
    const auhorization = req.headers.authorization;
    const token = auhorization.split(" ")[1];
    console.log(process.env.JWT_SECRET);
    jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
      console.log(error);
      if (error) {
        return res
          .status(401)
          .json({ status: false, message: "invalid token" });
      }
      user = response.userId;
    });
    const {
      answer1,
      correctAnswer1,
      answer2,
      correctAnswer2,
      answer3,
      correctAnswer3,
      answer4,
      correctAnswer4,
      answer5,
      correctAnswer5,
      answer6,
      correctAnswer6,
      answer7,
      correctAnswer7,
      answer8,
      correctAnswer8,
      answer9,
      correctAnswer9,
      answer10,
      correctAnswer10,
    } = req.body;
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
    }
    let count = 0;
    if (answer1 === correctAnswer1) {
      count++;
    }
    if (answer2 === correctAnswer2) {
      count++;
    }
    if (answer3 === correctAnswer3) {
      count++;
    }
    if (answer4 === correctAnswer4) {
      count++;
    }
    if (answer5 === correctAnswer5) {
      count++;
    }
    if (answer6 === correctAnswer6) {
      count++;
    }
    if (answer7 === correctAnswer7) {
      count++;
    }
    if (answer8 === correctAnswer8) {
      count++;
    }
    if (answer9 === correctAnswer9) {
      count++;
    }
    if (answer10 === correctAnswer10) {
      count++;
    }
    const examGiven = await ExamModel.create({
      user,
      answer1,
      correctAnswer1,
      answer2,
      correctAnswer2,
      answer3,
      correctAnswer3,
      answer4,
      correctAnswer4,
      answer5,
      correctAnswer5,
      answer6,
      correctAnswer6,
      answer7,
      correctAnswer7,
      answer8,
      correctAnswer8,
      answer9,
      correctAnswer9,
      answer10,
      correctAnswer10,
      marks: count,
    });
    res.status(201).json({ status: true, message: "Success", data: examGiven });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
