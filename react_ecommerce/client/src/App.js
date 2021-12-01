import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./services/auth";
import {LOGGED_IN_USER} from './store/reducers/types'

import Header from "./components/nav/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import RegisterComplete from "./pages/auth/RegisterComplete";

// User Pages
import UserPrivateRoute from "./components/routes/UserPrivateRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import History from "./pages/user/History";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPrivateRoute from "./components/routes/AdminPrivateRoute";
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/subCategory/SubCreate";
import SubUpdate from "./pages/admin/subCategory/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const { token } = await user.getIdTokenResult();
				console.log(token);
				const res = await currentUser(token);
				try {
					dispatch({
						type: LOGGED_IN_USER,
						payload: {
							name: res.data.name,
							email: res.data.email,
							token,
							role: res.data.role,
							_id: res.data._id,
						},
					});
				} catch (error) {
					console.log(error);
					toast.error("Something went wrong");
				}
			}
		});

		return () => {
			unsubscribe();
		};
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Header />
			<ToastContainer />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={RegisterPage} />
				<Route exact path="/forgot-password" component={ForgotPasswordPage} />
				<Route exact path="/register/complete" component={RegisterComplete}/>
				<UserPrivateRoute exact path="/user/history" comp={History} />
				<UserPrivateRoute exact path="/user/password" comp={Password} />
				<UserPrivateRoute exact path="/user/wishlist" comp={Wishlist} />
				<AdminPrivateRoute exact path="/admin/dashboard" comp={AdminDashboard} />
				<AdminPrivateRoute exact path="/admin/category" comp={CategoryCreate} />
				<AdminPrivateRoute exact path="/admin/category/:slug" comp={CategoryUpdate} />
				<AdminPrivateRoute exact path="/admin/sub" comp={SubCreate} />
				<AdminPrivateRoute exact path="/admin/sub/:slug" comp={SubUpdate} />
				<AdminPrivateRoute exact path="/admin/product" comp={ProductCreate} />

			</Switch>
		</>
	);
};
export default App;
