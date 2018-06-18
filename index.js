require( "babel-register" )( {
    presets: [ ['babel-register', "env"] ],
} );
require( "./src/server" );
