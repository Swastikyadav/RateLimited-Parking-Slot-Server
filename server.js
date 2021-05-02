require('dotenv').config();

const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/v1/api");

const PORT = process.env.PORT || 3000;

app.use(function( req, res, next ) {
  var data = '';
  req.on( 'data', function( chunk ) {
    data += chunk;
  });
  req.on( 'end', function() {
    req.rawBody = data;
    if ( data && data.indexOf( '{' ) > -1 ) {
      req.body = JSON.parse( data );
    }
    next();
  });
});


app.use("/", indexRouter);
app.use("/v1/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server started: Listening on port ${PORT}`);
});