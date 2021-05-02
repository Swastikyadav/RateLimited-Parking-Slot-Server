require('dotenv').config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", (req, res, next) => {
  console.log(process.env.AVAILABLE_PARKING_SLOTS);
  next();
});

app.listen(PORT, () => {
  console.log(`Server started: Listening on port ${PORT}`);
});