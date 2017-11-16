/**
 * Created by mattputipong on 10/19/17.
 */

'use strict';

const
	express         = require( 'express' ),
	jwt             = require( 'jsonwebtoken' ),
	{ userService } = require( '../services/UserService' ),
	{ secret }      = require( '../../config.json' );

const router = express.Router();

router.get( '/', ( req, res ) => {
	res.json( { message : 'request received' } );
} );

router.post( '/authenticate', ( req, res ) => {
	userService.getUser( { username : req.body.username, password : req.body.password } )
		.then( user => {
			if ( !user ) {
				res.json( { success : false, message : 'Authentication failed. Incorrect credentials.' } ).end();
			}

			const payload = {
				admin       : user.admin,
				permissions : user.permissions
			};

			const token = jwt.sign( payload, secret, {
				expiresIn : 60 * 60
			} );

			res.json( {
				success : true,
				message : 'Enjoy your token!',
				token
			} );
		} )
		.catch( err => {
			console.log( err );
		} );
} );

module.exports = router;