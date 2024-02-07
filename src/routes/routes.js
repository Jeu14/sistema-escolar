const express = require("express");
const { registerUser } = require("../controllers/userRegistration");

const router = express.Router();

router.post('/user', registerUser);

module.exports = router