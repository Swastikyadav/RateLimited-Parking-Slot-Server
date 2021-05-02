const express = require("express");
const router = express.Router();

const apiController = require("../../../controllers/apiController");

// Car info with car number
router.get("/car/:carNumber", apiController.carInfo);

// Slot info with slot number
router.get("/slot/:slotNumber", apiController.slotInfo);

// Park a car
router.post("/car", apiController.parkCar);

// Unpark the car
router.delete("/car/:carNumber", apiController.unParkCar);

module.exports = router;