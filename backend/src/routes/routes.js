const express = require("express");
const router = express.Router();
const { createUser, login, getUser } = require("../controller/userController");
const { createAdmin, loginAdmin } = require("../controller/adminController");
const {
  createQuestion,
  getQuestion,
  updateQuestion,
  getOneQuestion,
  getAllQuestion,
  deleteById,
} = require("../controller/questionController");
const { giveExam, getResult } = require("../controller/examController");
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
router.get("/question/:id", getOneQuestion);
router.get("/questionall", getAllQuestion);
router.patch("/question/:id", authenticate, authorization, updateQuestion);
router.delete("/question/:id", authenticate, authorization, deleteById);

//exam
router.post("/exam", authenticate, giveExam);
router.get("/result", getResult);
module.exports = router;
