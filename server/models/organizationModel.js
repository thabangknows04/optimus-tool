const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const organizationSchema = new mongoose.Schema({
  // Basic Info
  name: String,
  slug: String,
  description: String,
  logoUrl: String,
  website: String,
  industry: String,

  // Account Credentials
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone: String,

  // Contact Person / Admin
  contactPerson: {
    fullName: String,
    email: String,
    phone: String,
    position: String,
  },

  // Legal & Compliance
  registrationNumber: String,
  taxNumber: String,
  acceptedTerms: {
    generalServiceTerms: Boolean,
    privacyPolicy: Boolean,
    acceptedAt: Date,
  },
  verified: { type: Boolean, default: false },

  // Banking / Payout Info
  payoutInfo: {
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    accountType: String,
    branchCode: String,
    payoutCurrency: String,
  },

  // Access Control
  teamMembers: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      role: String,
      joinedAt: Date,
    },
  ],

  // Preferences
  settings: {
    timezone: String,
    language: String,
    notifications: {
      email: Boolean,
      sms: Boolean,
    },
    theme: String,
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
organizationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Organization", organizationSchema);
