import React from "react";
import { Link } from "react-router-dom";
import NavItems from '../../utils/admin-sidenav-items';

const AdminSideNav = () => {
	return (
		<nav>
			<ul className="nav flex-column">
				{NavItems.map((item, index) => {
					return (
						<li key={index} className="nav-item">
							<Link to={item.link} className="nav-link">
								{item.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default AdminSideNav;
