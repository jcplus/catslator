import React, {useEffect, useState} from 'react';

import './style.css';

const Settings = () => {
	const timeout = 3000;
	const [activeMenuItem, setActiveMenuItem] = useState('general');
	const [apiKey, setApiKey] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		(async () => {
			const key = await window.electronApi.getApiKey();
			if (key.trim().length) setApiKey(key.trim());
		})()
	}, []);

	const handleInputChange = (e) => {
		setApiKey(e.target.value);
	};

	const handleSave = async () => {
		const result = await window.electronApi.saveApiKey(apiKey);
		const message = result.success ? 'API key saved successfully' : 'Error saving API key: ' + result.error;
	};

	return (
		<div id="settings" className="full_height full_width flex flex_column align_stretch">
			<h2>General</h2>
			<div className="groups">
				<div className="group">
					<div className="flex flex_column item">
						<label htmlFor="api_key">API Key</label>
						<div className="flex align_center value">
							<input
								className="flex_grow" id="api_key" name="api_key" type="text"
								value={apiKey}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings;