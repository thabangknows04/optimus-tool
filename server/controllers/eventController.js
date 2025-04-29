const Event = require("../models/eventModel.js");

const addEvent = async (req, res) => {
  console.log("RAW BODY:", req.body);
  //  console.log("Headers:", req.headers);
  // console.log("Request Body:", JSON.stringify(req.body, null, 2));

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ message: "No JSON body received." });
  }

  try {
    const { basicInfo, details, guests } = req.body;

    const newEvent = new Event({
      // Basic Info
      organizations: basicInfo.organizations,
      eventName: basicInfo.eventName,
      eventType: basicInfo.eventType,
      startDate: basicInfo.startDate,
      endDate: basicInfo.endDate,
      venueName: basicInfo.venueName,
      address: basicInfo.address,
      city: basicInfo.city,
      state: basicInfo.state,
      zip: basicInfo.zip,
      country: basicInfo.country,
      description: basicInfo.description,
      eventImage: basicInfo.eventImage?.toString() || "",

      // Details
      schedule: details.schedule,
      speakers: details.speakers,
      requireRegistration: details.requireRegistration,
      sendReminders: details.sendReminders,
      collectFeedback: details.collectFeedback,

      // Guests
      invitationMethod: guests.invitationMethod,
      rsvpDeadline: guests.rsvpDeadline,
      customMessage: guests.customMessage,
      ticketTypes: guests.ticketTypes,
      guestList: guests.guestList,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      eventId: newEvent._id,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({ message: "Failed to create event...", error: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate("organizations");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch event", error: error.message });
  }
};

const getEventsByOrganizationId = async (req, res) => {
  console.log("geting events:");
  try {
    const { orgId } = req.params;
    console.log("Incoming request for orgId:", orgId);

    const events = await Event.find({ organizations: orgId }).populate(
      "organizations"
    );
    console.log("Found events:", events);

    res.status(200).json(events);
  } catch (error) {
    console.error("Error getting org events:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
};



module.exports = {
  addEvent,
  getEventById,
  getEventsByOrganizationId,
};
