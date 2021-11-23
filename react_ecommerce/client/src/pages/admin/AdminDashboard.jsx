import React from "react";
import AdminSideNav from "../../components/nav/AdminSideNav";

const AdminDashboard = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<AdminSideNav />
				<div className="col">Admin dashboard</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
