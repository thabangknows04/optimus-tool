const Event = require("../models/eventModel.js");

// Add a speaker to an event
const addSpeaker = async (req, res) => {
  try {
    const { name, bio, title, company, photo, eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const newSpeaker = {
      name,
      bio,
      title,
      company,
      photo,
    };

    event.speakers.push(newSpeaker);
    await event.save();

    res.status(200).json({
      message: "Speaker added successfully",
      speakers: event.speakers,
    });
  } catch (error) {
    console.error("Error adding speaker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing speaker
const editSpeaker = async (req, res) => {

   
  try {
    const { _id, name, bio, company, title, photo, eventId } = req.body;

    console.log(_id);

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const speaker = event.speakers.id(_id);
    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    // Update fields
    speaker.name = name;
    speaker.bio = bio;
    speaker.company = company;
    speaker.title = title;
    speaker.photo = photo;

    await event.save();

    res.status(200).json({
      message: "Speaker updated successfully",
      speakers: event.speakers,
    });
  } catch (error) {
    console.error("Error editing speaker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a speaker
const deleteSpeaker = async (req, res) => {
  try {
    const { speakerId } = req.params;

    const event = await Event.findOne({ "speakers._id": speakerId });
    if (!event) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    event.speakers = event.speakers.filter(
      (speaker) => speaker._id.toString() !== speakerId
    );

    await event.save();

    res.status(200).json({
      message: "Speaker deleted successfully",
      speakers: event.speakers,
    });
  } catch (error) {
    console.error("Error deleting speaker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addSpeaker,
  editSpeaker,
  deleteSpeaker,
};
