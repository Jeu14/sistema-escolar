const express = require("express");
const { registerUser } = require("../controllers/userRegistration");
const userLogin = require("../controllers/userLogin");
const loginVerify = require("../middlewares/loginVerify");
const registerStudent = require("../controllers/studentRegistration");
const registerClass = require("../controllers/classRegistration");
const registerGrade = require("../controllers/gradeRegistration");

const router = express.Router();

router.post("/user", registerUser);
router.post("/login", userLogin);
router.use(loginVerify);
router.get("/student", registerStudent)
router.post("/class", registerClass)
router.post("/grade", registerGrade)

module.exports = router;
