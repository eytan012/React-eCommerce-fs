import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { createOrUpdateUser } from "../../services/auth";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const val = window.localStorage.getItem("emailForSignIn");
		if (val) {
			setEmail(val);
		} else {
			history.push("/");
		}
	}, [history]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailLink(auth, email, window.location.href);
			if (res.user.emailVerified) {
				localStorage.removeItem("emailForSignIn");
				const user = auth.currentUser;
				await updatePassword(user, password);
				const { token } = await user.getIdTokenResult();
				try {
					const res = await createOrUpdateUser(token);
					console.log("Register complete res:", res);
					dispatch({
						type: "LOGGEN_IN_USER",
						payload: {
							token: token,
							email: res.data.email,
							name: res.data.name,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					toast.success("User Successfully Updated!");
					history.push("/");
				} catch (err) {
					console.log(err);
				}
				history.push("/");
			}
		} catch (error) {
			history.push("/register");
			console.log(error);
			toast.error(error.message);
		}
	};

	const CompleteRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				placeholder="Email"
				value={email}
				disabled
			/>

			<input
				type="password"
				className="form-control"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				autoFocus
				value={password}
			/>
			<br />
			<button type="submit" className="btn btn-raised">
				Complete Registration
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4 className="text-center">Register Complete</h4>
					{CompleteRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
