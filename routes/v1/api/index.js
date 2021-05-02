const express = require("express");
const router = express.Router();

const { parkedCars } = require("../../../data");
const { parkingSlots } = require("../../../data");

// Api Routes

// Park a car
router.post("/car", (req, res, next) => {
  const { carNo } = req.body;

  if (!carNo) {
    res.json({errMessage: "Car No is required!"});
  }

  const car = {
    carNo,
    parkedDateTime: new Date().getTime().toString(),
  }

  parkedCars.push(car);

  const findEmptySlot = parkingSlots.find(slot => slot.availbale === true);
  findEmptySlot.availbale = false;
  findEmptySlot.carNo = carNo;
  next();
});

module.exports = router;