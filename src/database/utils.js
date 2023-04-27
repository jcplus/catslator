const db = require('./db');

const getApiKey = async () => {
	try {
		const apiKey = await new Promise((resolve, reject) => {
			db.get('SELECT * FROM settings WHERE key = ?', ['api_key'], (err, row) => {
				if (err) {
					reject(err);
				} else {
					let value = row && row.value.trim() ? row.value.trim() : '';
					resolve(value);
				}
			});
		});
		return apiKey;
	} catch (error) {
		console.error('Error fetching API key:', error);
	}
};

const setApiKey = async (key) => {
	try {
		await new Promise((resolve, reject) => {
			db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['api_key', key], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		return {success: true};
	} catch (error) {
		console.error('Error saving API key:', error);
		return {success: false, error};
	}
};

module.exports = { getApiKey, setApiKey };
