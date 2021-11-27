import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createOrUpdateUser } from "../../services/auth";
import Loading from "../../components/loading/Loading";

import { Button, Divider } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = ({ history }) => {
	const [email, setEmail] = useState("eytan012@gmail.com");
	const [password, setPassword] = useState("123123");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push("/");
	}, [user,history]); 

	const roleBasedRedirect = (res) => {
		if (res.data.role === "admin") {
			history.push("/admin/dashboard");
		} else {
			history.push("/user/history");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			if (user) {
				const { token } = await user.getIdTokenResult();
				try {
					const res = await createOrUpdateUser(token);
					dispatch({
						type: "LOGGED_IN_USER",
						payload: {
							token: token,
							email: res.data.email,
							name: res.data.name,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					roleBasedRedirect(res);
				} catch (err) {
					console.log(err);
				}
				toast.success("Login Successful");
			}
		} catch (error) {
			console.log("fb error:", error);
			toast.error(error.message);
		}
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			const { user } = await signInWithPopup(auth, provider);
			if (user) {
				const { token } = await user.getIdTokenResult();
				try {
					const res = await createOrUpdateUser(token);
					dispatch({
						type: "LOGGED_IN_USER",
						payload: {
							token: token,
							email: res.data.email,
							name: res.data.name,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					roleBasedRedirect(res);
				} catch (err) {
					console.log(err);
				}
				toast.success("Login Successful");
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const LoginForm = () => (
		<form>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Enter Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</div>

			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Enter Password"
					autoComplete="on"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</div>

			<Button
				type="primary"
				icon={<MailOutlined />}
				onClick={handleSubmit}
				block
				className="mb-3"
				disabled={!email || password.length < 6}
			>
				Login 
			</Button>
			<Divider>OR</Divider>

			<Button
				type="danger"
				icon={<GoogleOutlined />}
				onClick={handleGoogleLogin}
				block
			>
				Google Login
			</Button>

			<Link to="/forgot-password" className="float-right text-danger">
				Forgot Password?
			</Link>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? (
						<Loading />
					) : (
						<>
							<h4 className="text-center">Login</h4>
							<Divider />
							{LoginForm()}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
