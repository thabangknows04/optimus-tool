const Event = require("../models/eventModel.js");

const updateAllGuests = async (req, res) => {
  try {
    const { eventId, newGuests, updatedGuests, removedGuestIds } = req.body;
    console.log("Received Guests: ", JSON.stringify(req.body));

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ✅ 1. Remove guests
    event.guestList = event.guestList.filter(
      guest => !removedGuestIds.includes(guest._id.toString())
    );

    // ✅ 2. Update existing guests
    updatedGuests.forEach(updated => {
      const index = event.guestList.findIndex(g => g._id.toString() === updated._id);
      if (index !== -1) {
        event.guestList[index] = { ...event.guestList[index]._doc, ...updated };
      }
    });

    // ✅ 3. Add new guests (skip temp IDs)
    newGuests.forEach(guest => {
      // remove temp _id if present
      if (guest._id?.startsWith("temp-")) delete guest._id;
      event.guestList.unshift(guest);
    });

    await event.save();
    res.status(200).json({ message: "Guests updated successfully", guestList: event.guestList });
  } catch (error) {
    console.error("Error updating guests:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  updateAllGuests,
};
