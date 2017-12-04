const sqlite3 = require('sqlite3').verbose();

//changes below
const env = process.env.NODE_ENV || 'development'; // not sure what this does

//open the database
let db = new sqlite3.Database('./db/icebreakers.sqlite', sqlite3.OPEN_READWRITE, (err) =>{
	if(err){
		console.error(`error connecting to ${env}`,err.message)
	}else {
		console.log(`Connected to database`);
	}
});


module.exports = db;
