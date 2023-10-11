const express = require("express");
const UserInfo = require("../models/userInfo");
const Flight = require("../models/flight");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      age,
      gender,
      email,
      passportnumber,
      nationality,
      flights,
    } = req.body;

    const newUser = new UserInfo({
      firstname,
      lastname,
      age,
      gender,
      email,
      passportnumber,
      nationality,
      flights: [], // Initialize the flights array
    });

    // Create and associate flight instances
    for (const flightData of flights) {
      const newFlight = new Flight(flightData);
      const savedFlight = await newFlight.save();
      newUser.flights.push(savedFlight._id);
    }

    const savedUser = await newUser.save();

    // Populate the flights in the response
    const userWithFlights = await UserInfo.findById(savedUser._id).populate(
      "flights"
    );

    res.json(userWithFlights);
  } catch (error) {
    console.error("Error adding traveler information: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query the database to get the user and populate the flights
    const userWithFlights = await UserInfo.findById(userId).populate("flights");

    if (!userWithFlights) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user and their flight details
    res.json(userWithFlights);
  } catch (error) {
    console.error("Error getting user with flights: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
