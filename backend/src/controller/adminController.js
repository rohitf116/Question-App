const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const AdminModel = require("../model/AdminModel");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
} = require("../validations/validations");
dotenv.config();
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
    }
    if (!isValid(name))
      return res.status(400).send({
        status: false,
        message: "The name Attributes should not be empty",
      });
    if (!isValidName(name))
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Valid Name" });
    if (!isValid(email))
      return res.status(400).send({
        status: false,
        msg: "The email Attributes should not be empty",
      });
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Email in valid Format" });

    const checkuniqueemail = await AdminModel.findOne({ email });
    if (checkuniqueemail)
      return res.status(400).send({
        status: false,
        message: "This Email is  already being used please use another email",
      });
    if (!isValid(password))
      return res.status(400).send({
        status: false,
        message: "The Password Attributes should not be empty",
      });

    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        message:
          "Password is not valid- your password should be 8 to 15 digit long",
      });
    if (!isValid(secret))
      return res.status(400).send({
        status: false,
        message: "The secret Attributes should not be empty",
      });
    const userCreated = await AdminModel.create({
      name,
      email,
      password,
      secret,
    });
    res.status(201).json({
      status: true,
      message: "Succesfully created",
      data: userCreated,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { password, email, secret } = req.body;
    if (!isValid(email) || !isValid(password) || !isValid(secret))
      return res.status(400).json({
        status: false,
        message: "Please Provide  Email, Password and secret",
      });
    console.log(password, email, secret);
    const user = await AdminModel.findOne({ email, password, secret });
    if (!user)
      return res.status(401).json({
        status: false,
        message: "The email , secret or Password you are using is wrong",
      });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      status: true,
      message: "Success",
      isAdmin: true,
      name: user.name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
