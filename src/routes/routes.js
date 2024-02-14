const express = require("express");
const { registerUser } = require("../controllers/userRegistration");
const userLogin = require("../controllers/userLogin");
const loginVerify = require("../middlewares/loginVerify");
const registerTeacher = require("../controllers/teacherRegistration");

const router = express.Router();

router.post("/user", registerUser);
router.post("/login", userLogin);
router.use(loginVerify);
router.get("/teacher", registerTeacher)

module.exports = router;
