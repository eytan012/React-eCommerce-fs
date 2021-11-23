import React, { useState,useEffect } from "react";
import {useSelector} from 'react-redux';
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import {Divider} from 'antd'

const actionCodeSettings = {
	url: 'http://localhost:3000/register/complete',
	handleCodeInApp: true,
};

const RegisterPage = ({history}) => {
	const [email, setEmail] = useState("");
	const {user} = useSelector(state=>({...state}))

	useEffect(()=>{
        if(user && user.token) history.push('/'); 
    },[user,history]); 

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);
			window.localStorage.setItem("emailForSignIn", email);
			toast.success(
				`Email is sent to ${email}. Click the Link to complete the registration`
			);
			setEmail("");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const RegisterForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				autoFocus
			/>
			<button type="submit" className="btn btn-raised">
				Sign-Up
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4 className="text-center">Register</h4>
					<Divider />
					{RegisterForm()}
                    
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
