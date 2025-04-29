const express = require("express");
const router = express.Router();
const { startChat } = require("../controllers/chatController.js");

router.post("/", startChat);


module.exports = router;
