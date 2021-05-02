let { requestCount } = require("../data");

function rateLimiter(req, res, next) {
  function isOverLimit(ip) {
    try {
      requestCount += 1;
    } catch(err) {
      throw err;
    }

    console.log(`${ip} has value: ${requestCount}`);

    if (requestCount > 10) {
      return true
    }

    setTimeout(() => {
      requestCount = 0;
    }, 10000);
  }

  let overLimit = isOverLimit(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
  if (overLimit) {
    res.status(429).json('Too many requests - try again later')
    return
  }

  next();
}

module.exports = rateLimiter;