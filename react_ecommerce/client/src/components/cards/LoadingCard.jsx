import React from "react";
import {Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
	const skeletons = () => {
		let total = [];
		for (let i = 0; i < count; i++) {
            total.push(
                <Card key={i} className="col-md-4">
                    <Skeleton active/>
                </Card>
            )
        }
        return total;
	};
	return <div className="row pb-5">{skeletons()}</div>;
};

export default LoadingCard;
