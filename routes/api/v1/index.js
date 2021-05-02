const express = require("express");
const router = express.Router();

const ErrorHandler = require("../../../errors/ErrorHandler");
const apiController = require("../../../controllers/apiController");

// Car info with car number
router.get("/car/:carNumber", apiController.carInfo);

// Slot info with slot number
router.get("/slot/:slotNumber", apiController.slotInfo);

// Park a car
router.post("/car", apiController.parkCar);

// Unpark the car
router.delete("/car/:carNumber", apiController.unParkCar);

// Invalid Endpoint
router.get("*", (req, res, next) => {
  next(ErrorHandler.notFoundError("API endpoint not found"));
})

module.exports = router;