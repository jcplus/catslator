import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBroom, faFileArrowUp} from '@fortawesome/free-solid-svg-icons';
import {addMessage} from '../../../redux';

import './style.css';

const Uploader = () => {
	const dispatch = useDispatch();
	const fileInputRef = useRef(null);
	const fileUploadRef = useRef(null);
	const [dragStatus, setDragStatus] = useState('empty');
	const [filePath, setFilePath] = useState(null);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (filePath) {
			(async () => {
				const result = await window.electronApi.extractTextFromPdf(filePath);
				if (result.error) {
					resetUploadedFile();
					addMessage(result.error.message);
				} else {
					addMessage(`file successfully read. text length ${result.data.length}`)
				}
			})()
		}
	}, [filePath]);

	const resetUploadedFile = () => {
		if (fileInputRef.current) fileInputRef.current.value = '';
		setDragStatus('empty');
	};

	const checkFileType = (file) => {
		const allowedTypes = ['doc', 'docx', 'pdf', 'rtf', 'txt'];
		if (allowedTypes.indexOf(file.name.split('.').pop()) === -1) {
			resetUploadedFile();
			dispatch(addMessage(`File type "${file.name.split('.').pop()}" is not supported`));
			return false;
		}
		return true;
	};

	const handInputClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleDragEnter = e => {
		e.preventDefault();
		e.stopPropagation();
		setDragStatus('enter');
	};

	const handleDragLeave = e => {
		e.preventDefault();
		e.stopPropagation();
		setDragStatus('leave');
	};

	const handleInputChange = e => {
		e.preventDefault();
		e.stopPropagation();
		if (e.target.files.length && checkFileType(e.target.files[0])) {
			setDragStatus('processing');
			setFilePath(e.target.files[0].path);
		}
	};

	const handleDrop = e => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.files.length && checkFileType(e.dataTransfer.files[0])) {
			setDragStatus('processing');
			setFilePath(e.dataTransfer.files[0].path);
		}
	};

	return (
		<div id="uploader" className={`full_height full_width flex align_center justify_center ${dragStatus}`}>
			<div className="full_wrapper ">
				<div className="handle"
					 ref={fileUploadRef}
					 onDragEnter={handleDragEnter}
					 onDragLeave={handleDragLeave}
					 onDrop={handleDrop}
					 onClick={handInputClick}
				>
					<input className="hidden" type="file" ref={fileInputRef} onChange={handleInputChange}/>
					<FontAwesomeIcon icon={faFileArrowUp} className="icon"/>
					<h3 className="text_center">
						Drop file here<br/>or click to upload
					</h3>
				</div>
			</div>
		</div>
	)
};

export default Uploader;