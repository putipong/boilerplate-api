/**
 * Created by mattputipong on 10/26/17.
 */

'use strict';

import express from 'express';
import jwt from 'express-jwt';
import { secret } from '../config/api-config.json';
import usersRoute from './users';

const router = express.Router();

router.use( jwt( { secret, requestProperty : 'auth' } ) );

router.use( '/users', usersRoute );

export default router;