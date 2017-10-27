/**
 * Created by mattputipong on 10/19/17.
 */

'use strict';

import express from 'express';
import { userService } from '../services/UserService';
import Guard from 'express-jwt-permissions';

const router = express.Router();
const users  = userService;
const guard  = Guard( {
	requestProperty : 'auth',
	permissionsProperty : 'permissions'
} );

router.put( '/createUser', guard.check( 'user:create' ), ( req, res ) => {
	const { username, password } = req.body;

	if ( !username || !password ) {
		return new Error( 'Username and password required' );
	}

	const params = {
		username,
		password,
		permissions: [
			'user:read'
		]
	};

	users.newUser( params ).then( resp => {
		console.log( 'Successfully created user: ' + username );
		console.log( resp );

		res.sendStatus( 200 ).end( 'Successfully created user ' + username );
	} );
} );

router.put( '/createAdmin', guard.check( [ 'admin', 'user:create' ] ), ( req, res ) => {
	const { username, password } = req.body;

	if ( !username || !password ) {
		return new Error( 'Username and password required' );
	}

	const params = {
		username,
		password,
		permission: [
			'admin',
			'user:read',
			'user:create'
		]
	};

	users.newUser( params ).then( resp => {
		console.log( resp );
		res.sendStatus( 200 ).end( 'Successfully created admin ' + username );
	} );
} );

router.get( '/:username', guard.check( 'user:read' ), ( req, res ) => {
	console.log( req.auth );
	users.randomRequest( { username : req.params.username } )
		.then( resp => {
			console.log( resp );

			res.status( 200 ).send( resp ).end();
		} );
} );

export default router;