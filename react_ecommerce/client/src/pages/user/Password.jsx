import React, { useState } from "react";
import UserSideNav from "../../components/nav/UserSideNav";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Divider } from 'antd';
import { updatePassword } from "@firebase/auth";


const Password = () => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const user = auth.currentUser;

	const handlePasswordUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await updatePassword(user, password);
			toast.success("Password Updated Successfully");
			setLoading(false);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
		}
		setPassword("");
	};

	const PasswordUpdateForm = (
		<form>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					id="password"
					placeholder="Enter New Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<Button
				disabled={password.length < 5}
				type="primary"
				onClick={handlePasswordUpdate}
			>
				Submit
			</Button>
		</form>
	);

	return (
		<div className="container-fluid">
			<div className="row">
				<UserSideNav />
				<div className="col mt-2">
					{loading ? (
						<div className="text-center">
							<h5>Updating Password...</h5>
						</div>
					) : (
						<>
							<h5>Password Update</h5>
							<Divider/>
							{PasswordUpdateForm}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Password;
