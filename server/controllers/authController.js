const bcrypt = require("bcryptjs");
const Organization = require("../models/organizationModel");

// Add more models here as needed
// const Admin = require("../models/adminModel");
// const Employee = require("../models/employeeModel");

const userModels = {
  organization: Organization,
  // admin: Admin,
  // employee: Employee,
};

const login = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!userType || !userModels[userType]) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  try {
    const Model = userModels[userType];
    const user = await Model.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: `${userType} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        userType,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = { login };
