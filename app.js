require('dotenv').config();

const express = require("express");
const app = express();

const customBodyParser = require("./middlewares/custom-body-parser");
const ErrorHandlerMiddleware = require("./middlewares/error-handler");
const rateLimiter = require("./middlewares/rate-limiter");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api/v1");

app.use(rateLimiter);

app.use(customBodyParser);

app.use("/", indexRouter);
app.use("/api/v1", apiRouter);

app.use(ErrorHandlerMiddleware);

module.exports = app;