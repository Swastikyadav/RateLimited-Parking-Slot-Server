const express = require("express");
const router = express.Router();

const ErrorHandler = require("../errors/ErrorHandler");

router.get("/", (req, res, next) => {
  res.json({ message: "You are on the root route" });
});

// Invalid Route
router.get("*", (req, res, next) => {
  next(ErrorHandler.notFoundError("API endpoint not found"));
})

module.exports = router;