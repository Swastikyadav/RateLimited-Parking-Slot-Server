require('dotenv').config();

const express = require("express");
const app = express();

const customBodyParser = require("./middlewares/custom-body-parser");
const ErrorHandlerMiddleware = require("./middlewares/error-handler");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/v1/api");

const PORT = process.env.PORT || 3000;

const redis = require("ioredis");
const client = redis.createClient({
  port: 6379,
  host: 'localhost',
});

client.on('connect', function() {
  console.log("connected");
});

app.use(async (req, res, next) => {
  async function isOverLimit(ip) {
    let res;
    try {
      res = await client.incr(ip);
    } catch(err) {
      throw err;
    }

    console.log(`${ip} has value: ${res}`);

    if (res > 10) {
      return true
    }
    client.expire(ip, 10)
  }

  let overLimit = await isOverLimit(req.headers['x-forwarded-for'] || req.connection.remoteAddress)

  if (overLimit) {
    res.status(429).json('Too many requests - try again later')
    return
  }

  next();
})

app.use(customBodyParser);

app.use("/", indexRouter);
app.use("/v1/api", apiRouter);

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started: Listening on port ${PORT}`);
});