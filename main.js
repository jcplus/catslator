const path = require('path');
const {app, BrowserWindow, globalShortcut, ipcMain, Menu, MenuItem, nativeImage} = require('electron');
const {getApiKey, setApiKey} = require('./src/database/utils');

let mainWindow;

/**
 * Create the main window of the application.
 */
function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 2000,
		height: 1200,
		backgroundColor: '#000000',
		icon: nativeImage.createFromPath('../app.ico'),
		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInSubFrames: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// Open devtools
	mainWindow.webContents.openDevTools();

	// Load the main page
	mainWindow.loadURL('http://localhost:3000/');

	// Prevent Ctrl/Cmd+W to close the main window
	mainWindow.webContents.on('before-input-event', (e, input) => {
		if (
			process.platform === 'darwin' &&
			input.type === 'keyDown' &&
			input.key.toLowerCase() === 'w' &&
			(input.control || input.meta)
		) {
			e.preventDefault();
		}
	});

	// Set app title
	mainWindow.once('ready-to-show', () => {
		mainWindow.setTitle('Catslator');
		mainWindow.show();
		mainWindow.focus();
	});

	// Close the app
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('will-quit', () => {
	// Deregister all shortcuts
	globalShortcut.unregisterAll();
});

app.on('ready', () => {
	createMainWindow();

	// Prevent Ctrl/Cmd+R to refresh the window
	globalShortcut.register('CmdOrCtrl+R', () => {
		console.log('CmdOrCtrl+R is pressed: Refresh is disabled');
	});

	// Prevent F5 to refresh the window
	globalShortcut.register('F5', () => {
		console.log('F5 is pressed: Refresh is disabled');
	});

	const appMenu = Menu.getApplicationMenu();
	console.log(appMenu)
});

/**
 * Listens for 'file-to-translate' event from the renderer process.
 * Handles the file data ArrayBuffer received from the renderer process.
 *
 * @param {Electron.IpcMainEvent} event - The event object from the renderer process.
 * @param {ArrayBuffer} fileData - The ArrayBuffer containing the file data.
 */
ipcMain.on('file-to-translate', async (event, fileData) => {
	try {
		const pdfBuffer = Buffer.from(fileData);
		import('pdf2json').then(({default: PDFParser}) => {
			const pdfParser = new PDFParser();

			pdfParser.on('pdfParser_dataReady', (pdfData) => {
				if (pdfData && pdfData.Pages) {
					// 遍历所有页面
					const text = pdfData.Pages.flatMap(page => {
						if (page.Texts) {
							return page.Texts.map(textObj => {
								if (textObj.R && textObj.R[0] && textObj.R[0].T) {
									return decodeURIComponent(textObj.R[0].T);
								} else {
									return ''; // 如果文本对象没有符合预期的结构，则返回空字符串
								}
							});
						} else {
							return []; // 如果当前页面没有文本对象，则返回空数组
						}
					}).join(' ');

					// 处理提取到的文本数据
					console.log('Extracted text from PDF:', text);
				} else {
					console.error('Unexpected PDF data format:', pdfData);
				}
			});

			pdfParser.on('pdfParser_dataError', (error) => {
				console.error('Error extracting text from PDF:', error);
			});

			pdfParser.parseBuffer(pdfBuffer);
		}).catch(error => {
			console.error('Error loading pdf2json:', error);
		});
	} catch (error) {
		console.error('Error processing PDF:', error);
	}
});

ipcMain.on('get-api-key', async (event) => {
	try {
		const apiKey = await getApiKey();
		event.sender.send('api-key-get-response', apiKey);
	} catch (error) {
		console.error('Error fetching API key:', error);
		event.sender.send('api-key-get-response', {error});
	}
});

ipcMain.on('save-api-key', async (event, key) => {
	try {
		const result = await setApiKey(key);
		event.sender.send('api-key-save-response', result);
	} catch (error) {
		console.error('Error saving API key:', error);
		event.sender.send('api-key-save-response', {success: false, error});
	}
});