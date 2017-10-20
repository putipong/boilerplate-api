/**
 * Created by mattputipong on 10/19/17.
 */

"use strict";

import express from 'express';

const router = express.Router();

router.get( '/', ( req, res ) => {
	res.json( { message: 'request received' } );
} );


export default router;