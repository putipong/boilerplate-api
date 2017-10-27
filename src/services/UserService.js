/**
 * Created by mattputipong on 10/20/17.
 */

"use strict";

import crypto from 'crypto';
import { databaseService } from '../services/DatabaseService';

class UserService {
	constructor() {
		this.secret = '1234567890';
		this.collection = 'users';
		this.db = databaseService;
	}

	encrypt( val ) {
		return crypto.createHmac( 'sha256', this.secret ).update( val ).digest( 'hex' );
	}

	newUser( params ) {
		params.password = this.encrypt( params.password );

		return this.db.insertDocument( this.collection, params );
	}

	getUser( params ) {
		params.password = this.encrypt( params.password );

		return this.db.getDocument( this.collection, params );
	}

	randomRequest( params ) {
		return this.db.getDocument( this.collection, params );
	}
}

export let userService = new UserService();