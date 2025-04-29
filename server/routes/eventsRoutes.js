const express = require("express");
const router = express.Router();
const { addEvent, getEventById, getEventsByOrganizationId } = require("../controllers/eventController.js");

router.post("/add", addEvent);
router.get("/get/:id", getEventById);
router.get("/get-all/:orgId", getEventsByOrganizationId);


module.exports = router;
