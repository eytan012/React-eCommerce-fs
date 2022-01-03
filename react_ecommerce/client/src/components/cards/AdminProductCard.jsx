import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;
const blankImage =
	"https://via.placeholder.com/125x125.png?text=Sorry+Something+Went+Wrong..+";

const AdminProductCard = ({ product, handleDelete }) => {
	const { title, description, images, slug } = product;

	return (
		<Card
			className="m-2 p-1"
			style={{ width: 250 }}
			cover={
				<img
					style={{ height: "150px", objectFit: "cover" }}
					alt={description}
					src={images.length > 0 ? images[0].url : blankImage}
				/>
			}
			actions={[
				<Link to={`/admin/product/${slug}`}>
					<EditOutlined className="text-primary" key="edit" />
				</Link>,
				<DeleteOutlined
					className="text-danger"
					key="setting"
					onClick={() => handleDelete(slug)}
				/>,
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

export default AdminProductCard;
