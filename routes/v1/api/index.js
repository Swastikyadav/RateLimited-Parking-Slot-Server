const express = require("express");
const router = express.Router();

const { parkedCars } = require("../../../data");
const { parkingSlots } = require("../../../data");
const ErrorHandler = require("../../../errors/ErrorHandler");

// Api Routes

// Park a car
router.post("/car", (req, res, next) => {
  try {
    const { carNo } = req.body;
    const findCar = parkedCars.find(car => car.carNo === carNo);
    const findEmptySlot = parkingSlots.find(slot => slot.availbale === true);

    // Check car number should be present.
    if (!carNo) {
      next(ErrorHandler.validationError("Car number is required!"));
    }

    // Check if car is already parked.
    if (!!findCar) {
      next(ErrorHandler.forbiddenError("This car is already parked."));
    }

    // Check if no parking slot is availbale.
    if (!findEmptySlot) {
      next(ErrorHandler.forbiddenError("Parking lot is full. Please try later."));
    }

    if (!!carNo && !findCar && !!findEmptySlot) {
      const car = {
        carNo,
        parkedDateTime: new Date().getTime().toString(),
      }
    
      parkedCars.push(car);
    
      findEmptySlot.availbale = false;
      findEmptySlot.carNo = carNo;
      
      res.json(findEmptySlot);
    }
  } catch (error) {
    next(ErrorHandler.serverError(error.message));
  }
});

module.exports = router;