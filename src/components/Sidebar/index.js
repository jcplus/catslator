import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFile, faLanguage, faCog} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveSidebarButton} from '../../redux/actions/sidebar';

import './style.css';

const Sidebar = () => {
	const dispatch = useDispatch();
	const activeSidebarButton = useSelector((state) => state.sidebar.activeSidebarButton);

	const handleItemClick = (status) => {
		dispatch(setActiveSidebarButton(status));
	};

	return (
		<div id="sidebar" className="flex flex_column align_stretch justify_between">
			<div className="flex flex_column align_stretch items">
				<a
					className={`flex align_center justify_center cursor_link item ${
						activeSidebarButton === 'translator' ? 'active' : ''
					}`}
					onClick={() => handleItemClick('translator')}
				>
					<FontAwesomeIcon icon={faLanguage}/>
				</a>
				<a
					className={`flex align_center justify_center cursor_link item ${
						activeSidebarButton === 'fileList' ? 'active' : ''
					}`}
					onClick={() => handleItemClick('fileList')}
				>
					<FontAwesomeIcon icon={faFile}/>
				</a>
			</div>
			<div className="flex flex_column align_stretch settings">
				<a
					className={`flex align_center justify_center cursor_link item ${
						activeSidebarButton === 'settings' ? 'active' : ''
					}`}
					onClick={() => handleItemClick('settings')}
				>
					<FontAwesomeIcon icon={faCog}/>
				</a>
			</div>
		</div>
	);
};

export default Sidebar;
