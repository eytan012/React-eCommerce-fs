import React, { useState,useEffect } from "react";
import {  useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Divider } from "antd";
import { toast } from "react-toastify";

const ForgotPasswordPage = ({ history }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const {user} = useSelector((state) => ({...state}));

    useEffect(()=>{
        if(user && user.token) history.push('/'); 
    },[user,history]); 

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await sendPasswordResetEmail(auth,email);
			toast.success("Email sent successfully. Please Check Your Email");
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};
	return (
		<div className="container col-md-6 offset-md-3 p-5">
			<h4 className="text-center">Forgot Password ? </h4>
			<Divider />
			{loading ? (
				<Loading />
			) : (
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							autoFocus
						/>
					</div>
					<button className="btn btn-raised" type="submit" disabled={!email}>
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

export default ForgotPasswordPage;
