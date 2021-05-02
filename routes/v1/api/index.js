const express = require("express");
const router = express.Router();

let { parkedCars } = require("../../../data");
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

router.delete("/car/:carNumber", (req, res, next) => {
  try {
    const { carNumber } = req.params;
    const findCar = parkedCars.find(car =>  car.carNo === Number(carNumber));
    const findCarSlot = parkingSlots.find(slot => slot.carNo === Number(carNumber));

    if (!findCar) {
      next(ErrorHandler.notFoundError(`No car found. carNo: ${carNumber} is not parked.`));
    }

    if (!!findCar && !!findCarSlot) {
      parkedCars = parkedCars.filter(car => car.carNo !== findCar.carNo);

      findCarSlot.availbale = true;
      findCarSlot.carNo = "";
      
      console.log(parkedCars, parkingSlots);
    }
  } catch (error) {
    next(ErrorHandler.serverError(error.message));
  }
});

module.exports = router;