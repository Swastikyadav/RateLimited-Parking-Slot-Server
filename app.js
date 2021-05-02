require('dotenv').config();

const express = require("express");
const app = express();

const customBodyParser = require("./middlewares/custom-body-parser");
const ErrorHandlerMiddleware = require("./middlewares/error-handler");
const rateLimiter = require("./middlewares/rate-limiter");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/v1/api");

const PORT = process.env.PORT || 3000;

app.use(rateLimiter);

app.use(customBodyParser);

app.use("/", indexRouter);
app.use("/v1/api", apiRouter);

app.use(ErrorHandlerMiddleware);

module.exports = app;