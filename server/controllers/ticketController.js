const Event = require("../models/eventModel.js");




const addTicket = async (req, res) => {

    console.log(req.body);

  try {
    const { description, name, price, quantity, availableUntil, eventId } =
      req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const newTicket = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      availableUntil,
    };

    event.ticketTypes.push(newTicket);
    await event.save();

    res
      .status(200)
      .json({ message: "Ticket added to event", tickets: event.ticketTypes });
  } catch (error) {
    console.error("Error adding ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteTicket = async (req, res) => {
    try {
      const { ticketId } = req.params;
  
      const event = await Event.findOne({ "ticketTypes._id": ticketId });
  
      if (!event) {
        return res.status(404).json({ message: "Ticket not found" });
      }
  
      // Filter out the ticket type to delete
      event.ticketTypes = event.ticketTypes.filter(
        (ticket) => ticket._id.toString() !== ticketId
      );
  
      await event.save();
  
      res.status(200).json({
        message: "Ticket deleted successfully",
        ticketTypes: event.ticketTypes, // Send updated ticket list
      });
    } catch (error) {
      console.error("Error deleting ticket type:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };




  const editTicket = async (req, res) => {
    try {
      const { _id, name, description, price, quantity, availableUntil, eventId } = req.body;
  
console.log(req.body);

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      const ticket = event.ticketTypes.id(_id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket type not found" });
      }
  
      // Update ticket fields
      ticket.name = name;
      ticket.description = description;
      ticket.price = parseFloat(price);
      ticket.quantity = parseInt(quantity);
      ticket.availableUntil = availableUntil;
  
      await event.save();
  
      res.status(200).json({
        message: "Ticket type updated successfully",
        ticketTypes: event.ticketTypes,
      });
    } catch (error) {
      console.error("Error updating ticket type:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



module.exports = {
  addTicket,
  deleteTicket,
  editTicket,
};
