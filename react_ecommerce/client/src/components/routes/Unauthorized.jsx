import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Unauthorized = () => {
	const [countDown, setCountDown] = useState(3);
	const history = useHistory();

	// countdown timer
	useEffect(() => {
		const timer = setInterval(() => {
			setCountDown(countDown - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [countDown]);

	// redirect to home page after 5 second
	useEffect(() => {
		if (countDown === 0) {
			history.push("/");
		}
	}, [countDown, history]);

	return (
		<div className="container text-center p-5">
			Redirect in {countDown} seconds...
		</div>
	);
};

export default Unauthorized;
