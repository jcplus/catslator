import './style.css'

const FileList = () => {
	return (
		<div id="file_list">
			<div className="wrapper">
				<div className="flex flex_column align_center cursor_link item">
					<div className="flex align_center justify_center icon">
						<img src="https://via.placeholder.com/100x120" alt="" className="full_wrapper_block"/>
					</div>
					<div className="flex flex_column flex_grow content">
						<div className="flex flex_column align_center justify_between top">
							<h3 className="text_truncate text_center file_name">Example File Name</h3>
							<span className="updated_at">20/04/2023 10:30 AM</span>
						</div>
					</div>
				</div>
				<div className="flex flex_column align_center cursor_link item">
					<div className="flex align_center justify_center icon">
						<img src="https://via.placeholder.com/100x120" alt="" className="full_wrapper_block"/>
					</div>
					<div className="flex flex_column flex_grow content">
						<div className="flex flex_column align_center justify_between top">
							<h3 className="text_truncate text_center file_name">Example File Name</h3>
							<span className="updated_at">20/04/2023 10:30 AM</span>
						</div>
					</div>
				</div>
				<div className="flex flex_column align_center cursor_link item">
					<div className="flex align_center justify_center icon">
						<img src="https://via.placeholder.com/100x120" alt="" className="full_wrapper_block"/>
					</div>
					<div className="flex flex_column flex_grow content">
						<div className="flex flex_column align_center justify_between top">
							<h3 className="text_truncate text_center file_name">Example File Name Example File Name Example File Name</h3>
							<span className="updated_at">20/04/2023 10:30 AM</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FileList