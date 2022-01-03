import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount,deleteProduct} from '../../../services/product'
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Divider } from "antd";

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
    const {token} = useSelector(state => state.user)

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		setLoading(true);
		try {
			const { data } = await getProductsByCount(100);
			setProducts(data);
		} catch (error) {
			toast.error(error);
		}
		setLoading(false);
	};
	const handleDelete = async (slug)=>{
		try {
			const res = await deleteProduct(slug,token)
			loadProducts();
			toast.success(`Product ${res?.data?.title} has been deleted!`)
		} catch (error) {
			toast.error("Oops something went wrong.. please try again")
		}
    }
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
					<div className="col">
					<h5 className="mt-2">Products</h5>
					<Divider />
					{loading ? (
						<LoadingOutlined style={{ fontSize: "2rem" }} className="m-5" />
					) : (
						<div className="col">
							<div className="row">
								{products.length > 0 && products.map((p) => (
									<AdminProductCard
										product={p}
										key={p._id}
										className="col-md-4"
										handleDelete={handleDelete}
									/>
								))}
							</div>
						</div>
					)}
				</div>
				</div>
		</div>
	);
};

export default AllProducts;
