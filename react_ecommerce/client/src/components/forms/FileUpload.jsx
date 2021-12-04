import React from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const FileUpload = ({ values, setValues, setLoading, loading }) => {
	const { token } = useSelector((state) => state.user);
	const uploadAndResize = (e) => {
		// resize
		const files = e.target.files;
		const uploadedFiles = values.images;
		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					async (uri) => {
						try {
							const res = await axios.post(
								`${process.env.REACT_APP_API}/cloudinary/uploadImages`,
								{ image: uri },
								{
									headers: {
										authtoken: token ? token : "",
									},
								}
							);
							console.log("FILEUPLOAD: ", res);
							setLoading(false);
							uploadedFiles.push(res.data);
							setValues({ ...values, images: uploadedFiles });
						} catch (error) {
							setLoading(false);
							console.log(error);
						}
					},
					"base64"
				);
			}
		}
		//send to server -> cloudinary
		//set urls in parent component
	};

	const handleRemove = async (public_id) => {
		setLoading(true);
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API}/cloudinary/removeImage`,
				{ public_id },
				{
					headers: {
						authtoken: token,
					},
				}
			);
			// remove img from state
			const { images } = values;
			const filtered = images.filter((img) => img.public_id !== public_id);
			setLoading(false);
			setValues({ ...values, images: filtered });
			toast.success(res?.data?.msg);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<>
			<div className="row">
				{loading ? (
					<LoadingOutlined className="m-3" style={{ fontSize: "2rem" }} />
				) : (
					<>
						{values?.images &&
							values?.images.map((img) => {
								return (
									<Badge
										onClick={() => handleRemove(img.public_id)}
										count="X"
										style={{ cursor: "pointer" }}
									>
										<Avatar
											key={img.url}
											className="mb-1 ml-3"
											shape="square"
											src={img.url}
											size={100}
										/>
									</Badge>
								);
							})}
					</>
				)}
			</div>
			<div className="row">
				<label className="btn btn-outlined border">
					Choose Files
					<input
						disabled={loading}
						type="file"
						multiple
						accept="image/*"
						hidden
						onChange={uploadAndResize}
					/>
				</label>
			</div>
		</>
	);
};

export default FileUpload;
