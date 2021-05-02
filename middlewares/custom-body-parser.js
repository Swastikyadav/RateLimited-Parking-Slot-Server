function customBodyParser( req, res, next ) {
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
}

module.exports = customBodyParser;