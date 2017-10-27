/**
 * Created by mattputipong on 10/23/17.
 */

"use strict";

let request = require( 'request' );

module.exports = function World() {
	let self = this;

	this.get = function( path, callback ) {
		let uri = this.uri( path ),
		    options = {
			    url: this.uri( path ),
			    headers: {
				    'User-Agent': 'request'
			    }
		    };

		request.get( options, function( err, resp ) {
			if ( err ) {
				return callback( new Error( 'Error on GET request to ' + uri + ': ' + err.message ) );
			}

			self.lastResponse = resp;
			callback( resp );
		} );
	};

	this.put = function( path, params, callback ) {
		let uri = this.uri( path ),
		    options = {
			    url: this.uri( path ),
			    form: params,
			    headers: {
				    'User-Agent': 'request',
				    'Content-Type': 'application/x-www-form-urlencoded'
			    }
		    };

		request.put( options, function( err, resp ) {
			if ( err ) {
				callback( new Error( 'Error on PUT request to ' + uri + ': ' + err.message ) );
			}

			self.lastResponse = resp;
			callback();
		} );
	};

	this.uri = function( path ) {
		return 'http://localhost:8080' + path;
	};

	this.req = this;
};