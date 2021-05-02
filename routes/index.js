const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "You are on the root route" });
});

module.exports = router;