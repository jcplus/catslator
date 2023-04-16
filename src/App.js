import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import FileList from './components/FileList';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Translator from './components/Translator';

import './App.css';

/**
 * The main App component.
 * @param {string} activeSidebarButton - The active sidebar button.
 * @returns {React.Element} - The rendered App component.
 */
function App({activeSidebarButton}) {
	return (
		<Router>
			<div className="full_height full_width flex align_stretch">
				<Sidebar/>
				<div id="main">
					{activeSidebarButton === 'translator' && <Translator/>}
					{activeSidebarButton === 'fileList' && <FileList/>}
					{activeSidebarButton === 'settings' && <Settings/>}
				</div>
			</div>
		</Router>
	);
}

const mapStateToProps = (state) => ({
	activeSidebarButton: state.activeSidebarButton,
});

export default connect(mapStateToProps)(App);
