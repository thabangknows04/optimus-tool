const Event = require("../models/eventModel.js");

// Add new activity
const addActivity = async (req, res) => {
    console.log(req.body);

  try {
    const { startTime, endTime, activity, speakerId, description, eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const newActivity = {
        startTime,
        endTime,
        activity,
      description,
      speakerId,
    };

    console.log(newActivity);


    event.schedule.push(newActivity);
    await event.save();

    res.status(200).json({
      message: "Activity added successfully",
      schedule: event.schedule,
    });
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};









// Edit activity
const editActivity = async (req, res) => {
  try {
    const { _id, startTime, endTime, activity, speakerId, description, eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const activityData = event.schedule.id(_id);
    if (!activityData) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Update fields
    activityData.activity = activity;
    activityData.startTime = startTime;
    activityData.endTime = endTime;
    activityData.speakerId = speakerId;
    activityData.description = description;

    await event.save();

    res.status(200).json({
      message: "Activity updated successfully",
      schedule: event.schedule,
    });
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const event = await Event.findOne({ "schedule._id": activityId });

    if (!event) {
      return res.status(404).json({ message: "Activity not found" });
    }

    event.schedule = event.schedule.filter(
      (act) => act._id.toString() !== activityId
    );

    await event.save();

    res.status(200).json({
      message: "Activity deleted successfully",
      schedule: event.schedule,
    });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addActivity,
  editActivity,
  deleteActivity,
};
