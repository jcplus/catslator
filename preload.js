const {contextBridge, ipcRenderer} = require('electron');

// contextBridge.exposeInMainWorld('ipcRenderer', {
// 	on: (channel, func) => ipcRenderer.on(channel, func),
// 	removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
// 	send: (channel, data) => ipcRenderer.send(channel, data),
// });

contextBridge.exposeInMainWorld('electronApi', {
	send: (channel, data) => {
		ipcRenderer.send(channel, data);
	},

	receive: (channel, func) => {
		ipcRenderer.on(channel, (event, ...args) => func(...args));
	},
});