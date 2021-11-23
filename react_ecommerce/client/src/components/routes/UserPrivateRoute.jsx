import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";

const UserPrivateRoute = ({ comp:Component, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	return user && user.token && user.role === "subscriber" ? (
		<Component {...rest} />
	) : (
		<Unauthorized/>
	);
    }
export default UserPrivateRoute;

