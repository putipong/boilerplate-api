/**
 * Created by mattputipong on 10/19/17.
 */
"use strict";

import Promise from 'bluebird';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import _ from 'lodash';
import path from 'path';

import baseRoute from './src/routes/index';

class ExpressServer {
	constructor( config ) {
		this.app = express();
		this.config = config || {};
	}

	init() {
		return new Promise( res => {
			this.app.use( compression() );
			this.app.use( cors() );
			this.app.use( bodyParser.urlencoded( { extended: true } ) );
			this.app.use( bodyParser.json() );

			this.port = this.config.port || 8080;

			this.app.use( '/', baseRoute );

			res( this );
		} );
	}

	start() {
		this.app.listen( this.port );
		console.log( 'App listening on port ' + this.port );
	}
}

if ( require.main === module ) {
	try {
		new ExpressServer().init().then( instance => instance.start() );
	} catch (e) {
		console.log( "Unable to start server.", e );
	}
}