const express = require("express");
const router = express.Router();
const { addSpeaker, deleteSpeaker, editSpeaker } = require("../controllers/speakerController.js");


router.post("/add", addSpeaker);
router.delete("/delete/:speakerId", deleteSpeaker);
router.put("/edit", editSpeaker);

module.exports = router;
