const bcrypt = require("bcryptjs");
const Organization = require("../models/organizationModel");

const addOrganization = async (req, res) => {
  console.log("RAW BODY:", req.body);
  console.log("Headers:", req.headers);
  console.log("Request Body:", JSON.stringify(req.body, null, 2));

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "No JSON body received." });
  }

  try {
    const {
      name,
      slug,
      description,
      logoUrl,
      website,
      industry,
      email,
      password,
      phone,
      contactPerson,
      registrationNumber,
      taxNumber,
      acceptedTerms,
      payoutInfo,
      settings,
    } = req.body;

    const existing = await Organization.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const organization = new Organization({
      name,
      slug,
      description,
      logoUrl,
      website,
      industry,
      email,
      passwordHash,
      phone,
      contactPerson,
      registrationNumber,
      taxNumber,
      acceptedTerms: {
        ...acceptedTerms,
        acceptedAt: new Date(),
      },
      payoutInfo,
      settings,
    });

    await organization.save();

    res.status(201).json({
      message: "Organization created successfully",
      organizationId: organization._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create organization", error: error.message });
  }
};

const getOrganizationById = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter

  try {
    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch organization", error: error.message });
  }
};

module.exports = { addOrganization, getOrganizationById };
