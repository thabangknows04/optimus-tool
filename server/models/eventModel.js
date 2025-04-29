const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: String,
  title: String,
  company: String,
  bio: String,
  photo: String, // Assume you're saving image URL or file path
});

const scheduleSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  activity: String,
  description: String,
  speakerId: String,
});

const ticketTypeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  availableUntil: String,
  description: String,
});

const guestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  allergies: String,
  dietary: String,  
  ticketType: String,
  rsvpStatus: { type: String, enum: ["pending", "accepted", "declined", "Pending", "Accepted", "Declined", "Confirmed", "confirmed"], default: "pending" },
});

const eventSchema = new mongoose.Schema({
  // Basic Info
  organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organization" }],
  eventName: String,
  eventType: String,
  startDate: String,
  endDate: String,
  venueName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  description: String,
  eventImage: String,

  // Details
  schedule: [scheduleSchema],
  speakers: [speakerSchema],
  requireRegistration: { type: Boolean, default: false },
  sendReminders: { type: Boolean, default: false },
  collectFeedback: { type: Boolean, default: false },

  // Guests
  invitationMethod: { type: String, default: "email" },
  rsvpDeadline: String,
  customMessage: String,
  ticketTypes: [ticketTypeSchema],
  guestList: [guestSchema],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
