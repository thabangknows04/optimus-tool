const express = require("express");
const router = express.Router();
const { addActivity, deleteActivity, editActivity } = require("../controllers/activityController.js");


router.post("/add", addActivity);
router.delete("/delete/:activityId", deleteActivity);
router.put("/edit", editActivity);

module.exports = router;
