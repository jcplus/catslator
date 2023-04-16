const path = require('path');
const {app, BrowserWindow, globalShortcut, ipcMain, Menu, MenuItem, nativeImage} = require('electron');
const {db} = require('./src/database/init');

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
	// if (process.platform === 'darwin') {
	//
	// 	if (appMenu) {
	// 		const appMenuItem = appMenu.items.find((item) => item.role === 'appmenu');
	//
	// 		if (appMenuItem) {
	// 			const aboutItemIndex = appMenuItem.submenu.items.findIndex(
	// 				(item) => item.role === 'about'
	// 			);
	//
	// 			if (aboutItemIndex !== -1) {
	// 				const separatorIndex = appMenuItem.submenu.items.findIndex(
	// 					(item, index) => item.type === 'separator' && index > aboutItemIndex
	// 				);
	//
	// 				const preferencesItem = new MenuItem({
	// 					label: 'Settings',
	// 					accelerator: 'Cmd+,',
	// 					click: () => {
	// 						// createSettingsWindow();
	// 					},
	// 				});
	//
	// 				if (separatorIndex !== -1) {
	// 					appMenuItem.submenu.insert(separatorIndex + 1, preferencesItem);
	// 				} else {
	// 					appMenuItem.submenu.append(preferencesItem);
	// 				}
	//
	// 				Menu.setApplicationMenu(appMenu);
	// 			}
	// 		}
	// 	}
	// }
});