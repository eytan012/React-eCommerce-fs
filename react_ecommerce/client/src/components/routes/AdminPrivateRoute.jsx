import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";
import { currentAdmin } from "../../services/auth";

const AdminPrivateRoute = ({ comp: Component, ...rest}) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		const isAdmin = async () => {
			if (user && user.token) {
				try {
					await currentAdmin(user.token);
					setIsAdmin(true);
				} catch (err) {
					console.log("AdminPrivateRoute:", err);
				}
			}
		};
		isAdmin();
        // clean up
        return () => {
            setIsAdmin(false);
        }
	}, [user]);

	return isAdmin && user.role === "admin" ? (
		<Component {...rest} />
	) : (
		<Unauthorized />
	);
};
export default AdminPrivateRoute;
