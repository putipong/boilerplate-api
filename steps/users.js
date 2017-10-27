/**
 * Created by mattputipong on 10/23/17.
 */

"use strict";

const
	{ defineSupportCode } = require( 'cucumber' ),
	{ expect } = require( 'chai' ),
	testParams = require( './testParams.json' );

defineSupportCode( function( { Given, Then, When, setWorldConstructor } ) {
	setWorldConstructor( require( './World' ) );

	Given( 'The user does not exist', function( callback ) {
		this.req.get( `/users/${ testParams.newUser.username }`, function( resp ) {
			expect( resp.statusCode ).to.equal( 200 );
			expect( resp.body ).to.be.empty;
			callback();
		} );
	} );
	When( 'I add a new user', function( callback ) {
		let params = testParams.newUser;

		return this.req.put( '/users', params, callback );
	} );
	Then( 'A user should be created in the database', function( callback ) {
		this.req.get( `/users/${ testParams.newUser.username }`, function( resp ) {
			expect( resp.statusCode ).to.equal( 200 );
			expect( JSON.parse( resp.body ) ).to.not.be.empty;
			callback();
		} );
	} );
} );