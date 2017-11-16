/**
 * Created by mattputipong on 10/19/17.
 */

'use strict';

const
	express             = require( 'express' ),
	cors                = require( 'cors' ),
	morgan              = require( 'morgan' ),
	bodyParser          = require( 'body-parser' ),
	compression         = require( 'compression' ),
	{ databaseService } = require( './src/services/DatabaseService' ),
	baseRoute           = require( './src/routes/index' ),
	api                 = require( './src/routes/api' );

class Server {
	constructor( config ) {
		this.config  = typeof config === 'string' ? require( config ) : config;
		this.express = express();

		this.db = databaseService;

		if ( process.env.NODE_ENV === 'prod' ) {
			Server.disableLogger();
		}
	}

	init() {
		return new Promise( res => {
			this.express.locals.server = this;
			this.express.locals.config = this.config;

			this.express.use( compression() );
			this.express.use( cors() );
			this.express.use( bodyParser.urlencoded( { extended : true } ) );
			this.express.use( bodyParser.json() );
			this.express.use( morgan( 'dev' ) );

			this.port = this.config.port || 8080;

			this.express.use( '/', baseRoute );
			this.express.use( '/api', api );

			res( this );
		} );
	}

	start() {
		this.db.connect( err => {
			this.express.listen( this.port );
		} );

		console.log( 'App listening on port ' + this.port );
	}

	static disableLogger() {
		console.log = function() {
		};
	}
}

if ( require.main === module ) {
	try {
		new Server( './config.json' ).init().then( instance => instance.start() ).catch( err => console.log( err ) );
	} catch ( e ) {
		console.log( 'Unable to start server.', e );
	}
}