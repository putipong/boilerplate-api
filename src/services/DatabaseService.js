/**
 * Created by mattputipong on 10/19/17.
 */

"use strict";

import mongo from 'mongodb';

class DatabaseService {
	constructor( config ) {
		this.client = mongo.MongoClient.connect( config.url, ( err, db ) => db );
	}
}

export default DatabaseService;