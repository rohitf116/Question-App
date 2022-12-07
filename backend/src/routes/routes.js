const express = require("express");
const router = express.Router();
const { createUser, login, getUser } = require("../controller/userController");
const { createAdmin, loginAdmin } = require("../controller/adminController");
const {
  createQuestion,
  getQuestion,
  updateQuestion,
} = require("../controller/questionController");
const { giveExam } = require("../controller/examController");
const { authenticate } = require("../auth/auth");
const { authorization } = require("../auth/authorization");

//admin
router.post("/admin", createAdmin);
router.post("/adminLogin", loginAdmin);
//user
router.post("/user", createUser);
router.post("/login", login);
router.get("/user", authenticate, authorization, getUser);
//question
router.post("/question", authenticate, authorization, createQuestion);
router.get("/question", getQuestion);
router.patch("/question/:id", authenticate, authorization, updateQuestion);
//exam
router.post("/exam", authenticate, giveExam);
module.exports = router;
