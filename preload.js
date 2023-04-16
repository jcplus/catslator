const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
	on: (channel, func) => ipcRenderer.on(channel, func),
	removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
	send: (channel, data) => ipcRenderer.send(channel, data),
});

contextBridge.exposeInMainWorld('electronApi', {
	extractTextFromPdf: async filePath => {
		try {
			const result = await ipcRenderer.invoke('extract-text-from-pdf', filePath);
			return {data: result};
		} catch (error) {
			return {error: error};
		}
	},

	getApiKey: async () => {
		return await ipcRenderer.invoke('get-api-key');
	},

	saveApiKey: async (key) => {
		return await ipcRenderer.invoke('save-api-key', key);
	},
});

ipcRenderer.on('render-settings-page', () => {
	ipcRenderer.send('render-settings-page');
});