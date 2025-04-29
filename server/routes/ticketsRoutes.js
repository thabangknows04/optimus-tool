const express = require("express");
const router = express.Router();
const { addTicket, deleteTicket, editTicket } = require("../controllers/ticketController.js");


router.post("/add", addTicket);
router.delete("/delete/:ticketId", deleteTicket);
router.put("/edit", editTicket);

module.exports = router;
