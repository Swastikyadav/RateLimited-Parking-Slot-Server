require('dotenv').config();

const express = require("express");
const app = express();

const customBodyParser = require("./middlewares/custom-body-parser");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/v1/api");

const PORT = process.env.PORT || 3000;

app.use(customBodyParser);

app.use("/", indexRouter);
app.use("/v1/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server started: Listening on port ${PORT}`);
});