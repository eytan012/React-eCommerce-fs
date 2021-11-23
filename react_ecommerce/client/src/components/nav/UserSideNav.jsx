import React from "react";
import { Link } from "react-router-dom";

const NavItems = [
    {
        name: "History",
        link: "/user/history",
    },
    {
        name: "Update Password",
        link: "/user/password",
    },
    {
        name: "Wish List",
        link: "/user/wishlist",
    },
]

const UserSideNav = () => {
	return (
		<nav>
			<ul className="nav flex-column">
            {
                NavItems.map((item, index) => {
                    return (
                        <li key={index} className="nav-item">
                            <Link to={item.link} className="nav-link">{item.name}</Link>
                        </li>
                    )
                }
                )
            }
			</ul>
		</nav>
	);
};

export default UserSideNav;