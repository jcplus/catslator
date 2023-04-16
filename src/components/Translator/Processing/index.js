import React from 'react';

import './style.css';

const Processing = () => {
	return (
		<div id="result" className="flex_grow">
			<div className="full_wrapper">
				<h3 className="text_center">Processing...</h3>
				<svg className="bar" width="200" height="20">
					<rect x="0" y="0" width="200" height="20" rx="3" fill="transparent" stroke="#fff"
						  strokeWidth="5"/>
					<rect id="progress" x="0" y="0" width="0" height="20" rx="3" fill="#fff">
						<animate attributeName="width" dur="2s" repeatCount="indefinite" from="0" to="200"/>
					</rect>
				</svg>
			</div>
		</div>
	);
};

export default Processing;
