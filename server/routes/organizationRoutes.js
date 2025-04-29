const express = require("express");
const router = express.Router();
const { addOrganization, getOrganizationById } = require("../controllers/organizationController");

router.post("/add", addOrganization);
router.get("/get/:id", getOrganizationById);

module.exports = router;
