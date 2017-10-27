/**
 * Created by mattputipong on 10/19/17.
 */

"use strict";

import express from 'express';
import { userService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import { secret } from '../config/api-config.json';

const router = express.Router();

router.get( '/', ( req, res ) => {
	res.json( { message: 'request received' } );
} );

router.post( '/authenticate', ( req, res ) => {
	userService.getUser( { username: req.body.username, password: req.body.password } )
		.then( user => {
			if ( !user ) {
				res.json( { success: false, message: 'Authentication failed. Incorrect credentials.' } ).end();
			}

			const payload = {
				admin: user.admin,
				permissions: user.permissions
			};

			const token = jwt.sign( payload, secret, {
				expiresIn: 60 * 60
			} );

			res.json( {
				success: true,
				message: 'Enjoy your token!',
				token
			} );
		} )
		.catch( err => {
			console.log( err );
		} );
} );

export default router;