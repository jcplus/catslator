import React, {useState} from 'react';
import Processing from './Processing';
import Result from './Result';
import Uploader from './Uploader';

import './style.css';

const Translator = () => {
	const [translationStatus, setTranslationStatus] = useState('uploader');

	const handleUpload = () => {
		setTranslationStatus('processing');
	};

	const handleShowResult = () => {
		setTranslationStatus('result');
	};

	return (
		<div id="translator" className="flex_grow">
			<div className="full_wrapper">
				{translationStatus === 'uploader' && <Uploader onUpload={handleUpload}/>}
				{translationStatus === 'processing' && (
					<Processing onShowResult={handleShowResult}/>
				)}
				{translationStatus === 'result' && <Result/>}
			</div>
		</div>
	);
};

export default Translator;
