/**
 * Created by mattputipong on 10/19/17.
 */

"use strict";

import Promise from 'bluebird';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { databaseService } from './src/services/DatabaseService';

import baseRoute from './src/routes/index';
import api from './src/routes/api';

class ExpressServer {
	constructor( conf ) {
		this.config = require( conf );
		this.app = express();

		this.db = databaseService;

		if ( process.env.NODE_ENV === 'prod' ) {
			ExpressServer.disableLogger();
		}
	}

	init() {
		return new Promise( res => {
			this.app.use( compression() );
			this.app.use( cors() );
			this.app.use( bodyParser.urlencoded( { extended: true } ) );
			this.app.use( bodyParser.json() );
			this.app.use( morgan( 'dev' ) );

			this.port = this.config.port || 8080;

			this.app.use( '/', baseRoute );
			this.app.use( '/api', api );

			res( this );
		} );
	}

	start() {
		this.db.connect( err => {
			this.app.listen( this.port );
		} );

		console.log( 'App listening on port ' + this.port );
	}

	static disableLogger() {
		console.log = function() {};
	}
}

if ( require.main === module ) {
	try {
		new ExpressServer( './api-config.json' ).init().then( instance => instance.start() );
	} catch (e) {
		console.log( "Unable to start server.", e );
	}
}