import React, { useEffect, useState } from "react";
import AdminSideNav from "../../components/nav/AdminSideNav";
import { Divider } from "antd";


const AdminDashboard = () => {

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
					<div className="col">
					<h5 className="mt-2">Admin dashboard</h5>
					<Divider />
				</div>
				</div>
		</div>
	);
};

export default AdminDashboard;
