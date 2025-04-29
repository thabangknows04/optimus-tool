const express = require("express");
const router = express.Router();
const { updateAllGuests } = require("../controllers/guestController.js");


router.post("/update-all", updateAllGuests);

module.exports = router;
