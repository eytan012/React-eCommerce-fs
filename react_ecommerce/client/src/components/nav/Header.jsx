import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {LOGOUT} from "../../store/reducers/types"
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Menu } from "antd";
import {
	HomeOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
	const [current, setCurrent] = useState("home");
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const history = useHistory();
	const handleClick = (e) => {
		setCurrent((prevState) => (prevState = e.key));
	};

	const logout = () => {
		signOut(auth);
		dispatch({ type: LOGOUT, payload: null });
		history.push("/login");
	};

	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
			<Item key="home" icon={<HomeOutlined />}>
				<Link to="/">Home</Link>
			</Item>

			{!user && (
				<>
					<Item
						key="Register"
						icon={<UserAddOutlined />}
						className="float-right"
					>
						<Link to="/register">Register</Link>
					</Item>

					<Item key="login" icon={<UserOutlined />} className="float-right">
						<Link to="/login">Login</Link>
					</Item>
				</>
			)}

			{user && (
				<SubMenu
					key="SubMenu"
					icon={<SettingOutlined />}
					title={`${user?.email && user.email.split("@")[0].toUpperCase()}`}
					className="float-right"
				>
					{user && user.role === "subscriber" && (
						<Item key="dashboard">
							<Link to="/user/history">Dashboard</Link>
						</Item>
					)}
					{user && user.role === "admin" && (
						<Item key="admin-dashboard">
							<Link to="/admin/dashboard">Admin Dashboard</Link>
						</Item>
					)}
					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
