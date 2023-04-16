const fs = require('fs');
const pdfParse = require('pdf-parse');
const {ipcMain} = require("electron");

ipcMain.handle('extract-text-from-pdf', async (e, filePath) => {
	return new Promise(async (resolve, reject) => {
		try {
			const pdfBytes = fs.readFileSync(filePath);
			const pdfData = await pdfParse(pdfBytes);
			resolve(pdfData.text);
		} catch (error) {
			console.error('Error while extracting text from PDF:', error);
			reject(error);
		}
	});
});