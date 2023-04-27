import React, {useEffect, useState, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addMessage} from '../../redux';
import useUpdateEffect from '../../hooks/useUpdateEffect';

import './style.css';

const Settings = () => {
	const timeout = 1000;
	const dispatch = useDispatch();
	const [apiKey, setApiKey] = useState('');
	const [ajaxInProgress, setAjaxInProgress] = useState(false);

	useEffect(() => {
		setAjaxInProgress(true);
		window.electronApi.send('get-api-key');
		window.electronApi.receive('api-key-get-response', (key) => {
			setApiKey(key);
			setAjaxInProgress(false);
		});
	}, []);

	const handleInputChange = (e) => {
		const inputValue = e.target.value.replace(/\s+/g, '');
		setApiKey(inputValue);
	};

	const handleSaveApiKey = () => {
		if (apiKey.trim().length < 16) {
			dispatch(addMessage('API key is too short'));
			return;
		}

		const timer = setTimeout(() => {
			window.electronApi.send('save-api-key', apiKey);
			window.electronApi.receive('api-key-save-response', (result) => {
				const message = result.success
					? 'API key saved successfully'
					: 'Error saving API key: ' + result.error;
				dispatch(addMessage(message));
			});
		}, timeout);

		return () => {
			clearTimeout(timer);
		};
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
							<button disabled={!apiKey.length} onClick={apiKey.length ? handleSaveApiKey : null}>Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings;