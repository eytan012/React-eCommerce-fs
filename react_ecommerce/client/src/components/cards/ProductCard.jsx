import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;
const blankImage =
	"https://via.placeholder.com/125x125.png?text=Sorry+Something+Went+Wrong..+";

const ProductCard = ({ product }) => {
	const { title, description, images, slug } = product;

	return (
		<Card
			className="m-2 p-1"
			style={{ width: "18rem" }}
			cover={
				<img
					style={{ height: "150px", objectFit: "cover" }}
					alt={description}
					src={images.length > 0 ? images[0].url : blankImage}
				/>
			}
			actions={[
				<>
					<Link to={`/product/${slug}`}>
						<EyeOutlined key="eye" />
						<p>View Product</p>
					</Link>
				</>,
				<>
					<ShoppingCartOutlined key="shopping" />
					<p>Add To Cart</p>
				</>,
			]}
		>
			<Meta
				style={{ textTransform: "capitalize" }}
				title={title}
				description={`${description && description.substring(0, 40)}...`}
			/>
		</Card>
	);
};

export default ProductCard;
