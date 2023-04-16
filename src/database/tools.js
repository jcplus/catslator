import {ipcMain} from "electron";
import {db} from "./init";


ipcMain.handle('get-api-key', async () => {
	try {
		const apiKey = await new Promise((resolve, reject) => {
			db.get('SELECT * FROM settings WHERE key = ?', ['api_key'], (err, row) => {
				if (err) {
					reject(err);
				} else {
					if (row && row.value.trim()) {
						resolve(row.value);
					} else {
						resolve('');
					}
				}
			});
		});
		return apiKey;
	} catch (error) {
		console.error('Error fetching API key:', error);
	}
});

ipcMain.handle('save-api-key', async (event, key) => {
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
});