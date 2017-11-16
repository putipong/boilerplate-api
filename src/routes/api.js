/**
 * Created by mattputipong on 10/26/17.
 */

'use strict';

const
	express    = require( 'express' ),
	jwt        = require( 'express-jwt' ),
	{ secret } = require( '../../config.json' ),
	usersRoute = require( './users' );

const router = express.Router();

router.use( jwt( { secret, requestProperty : 'auth' } ) );

router.use( '/users', usersRoute );

module.exports = router;