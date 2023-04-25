import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileArrowUp} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux';
import {addMessage} from '../../../redux';


import './style.css';

const Uploader = () => {
	const dispatch = useDispatch();
	const fileInputRef = useRef(null);
	const [dragStatus, setDragStatus] = useState('empty');

	/**
	 * Checks if the provided file's type is supported.
	 * @param {File} file - The file object to check.
	 * @returns {boolean} - Returns true if the file type is supported, false otherwise.
	 */
	const checkFileType = (file) => {
		const allowedTypes = ['pdf'];
		if (allowedTypes.indexOf(file.name.split('.').pop()) === -1) {
			resetUploadedFile();
			dispatch(addMessage(`File type "${file.name.split('.').pop()}" is not supported`));
			return false;
		}
		return true;
	};

	/**
	 * Triggers a click event on the file input element.
	 */
	const handInputClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};


	/**
	 * Handles the 'dragleave' event on the file drop area.
	 * @param {DragEvent} e - The drag event object.
	 */
	const handleDragLeave = e => {
		e.preventDefault();
		e.stopPropagation();
		setDragStatus('leave');
	};

	/**
	 * Handles the 'dragover' event on the file drop area.
	 * @param {DragEvent} e - The drag event object.
	 */
	const handleDragOver = e => {
		e.preventDefault();
		e.stopPropagation();
		setDragStatus('enter');
	};

	/**
	 * Handles the 'change' event on the file input element.
	 * @param {ChangeEvent} e - The change event object.
	 */
	const handleInputChange = async e => {
		e.preventDefault();
		e.stopPropagation();
		if (e.target.files.length && checkFileType(e.target.files[0])) {
			setDragStatus('processing');
			try {
				const fileData = await readFileAsArrayBuffer(e.target.files[0]);
				window.electronApi.send('file-to-translate', fileData);
			} catch (error) {
				console.error('Error reading file:', error);
			}
		}
	};


	/**
	 * Handles the 'drop' event on the file drop area.
	 * @param {DragEvent} e - The drag event object.
	 */
	const handleDrop = async e => {
		e.preventDefault();
		e.stopPropagation();
		if (
			e.dataTransfer.items && e.dataTransfer.items[0].kind === 'file'
			&& e.dataTransfer.files.length && checkFileType(e.dataTransfer.files[0])
		) {
			setDragStatus('processing');
			const item = e.dataTransfer.items[0];
			const file = item.getAsFile();

			try {
				const fileData = await readFileAsArrayBuffer(file);
				window.electronApi.send('file-to-translate', fileData);
			} catch (error) {
				console.error('Error reading file:', error);
			}
		}
	};

	/**
	 * Reads a File object as an ArrayBuffer asynchronously.
	 * @param {File} file - The file object to read.
	 * @returns {Promise<ArrayBuffer>} - A promise that resolves to the ArrayBuffer of the file data.
	 */
	const readFileAsArrayBuffer = async (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve(e.target.result);
			};
			reader.onerror = (error) => {
				reject(error);
			};
			reader.readAsArrayBuffer(file);
		});
	};

	/**
	 * Resets the uploaded file and clears the drag status.
	 */
	const resetUploadedFile = () => {
		if (fileInputRef.current) fileInputRef.current.value = '';
		setDragStatus('empty');
	};


	return (
		<div id="uploader" className="full_height full_width flex align_center justify_center">
			<div className="full_wrapper flex flex_column align_center justify_center justify_center">
				<div className={`flex flex_column align_center cursor_link handle ${dragStatus}`}
					 onDragLeave={handleDragLeave}
					 onDragOver={handleDragOver}
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