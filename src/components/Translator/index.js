import React, {useState} from 'react';
import Processing from './Processing';
import Result from './Result';
import Uploader from './Uploader';

import './style.css';

const Translator = () => {
	const [translationStatus, setTranslationStatus] = useState('uploader');

	return (
		<div id="translator" className="full_height full_width">
			<div className="full_wrapper">
				{translationStatus === 'uploader' && <Uploader/>}
				{translationStatus === 'result' && <Result/>}
			</div>
		</div>
	);
};

export default Translator;
