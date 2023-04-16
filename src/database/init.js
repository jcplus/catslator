const {app} = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let db;

function initialiseDatabase() {
	// Define the path to the user's database file in their user data directory
	const userDbPath = path.join(app.getPath('userData'), 'userDatabase.db');
	db = new sqlite3.Database(userDbPath);

	// Check if the user's database file exists
	if (!fs.existsSync(userDbPath)) {
		// Create the settings table
		db.run(
			`CREATE TABLE IF NOT EXISTS settings
             (
                 id
                 INTEGER
                 PRIMARY
                 KEY,
                 key
                 TEXT
                 UNIQUE,
                 value
                 TEXT
             )`,
			(err) => {
				if (err) {
					console.error('Failed to create settings table:', err)
				} else {
					console.log('Settings table created successfully')
				}
			}
		);
	}
}

initialiseDatabase();

module.exports = {db};
