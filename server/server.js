const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const orgRoutes = require("./routes/organizationRoutes");
const eventsRoutes = require("./routes/eventsRoutes.js");
const ticketsRoutes = require("./routes/ticketsRoutes.js");
const speakerRoutes = require("./routes/speakerRoutes.js");
const activitiesRoutes = require("./routes/activitiesRoutes.js");
const guestsRoutes = require("./routes/guestsRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js")
const cors = require("cors");
// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: ["https://client-t3p0.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json()); // <--- move this here!

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/organizations", orgRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/activities", activitiesRoutes);

app.use("/api/guests", guestsRoutes);

app.get("/", (req, res) => {
  console.log("GET request received on /");
  res.send("🚀  Backend is running!");
});

const PORT = process.env.PORT || 433;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
