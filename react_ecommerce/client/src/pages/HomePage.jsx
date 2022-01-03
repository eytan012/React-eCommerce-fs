import React, { useEffect, useState } from "react";
import Jumbotron from "../components/jumbotron/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import { getProductsByCount } from "../services/product";
import { toast } from "react-toastify";

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
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
	return (
		<>
			<div className="jumbotron">
				{loading ? (
					<p>Loading...</p>
				) : (
					<div className="text-center font-weight-bold h4">
						<Jumbotron text={["New Arrivals!", "Latest Products!"]} />
					</div>
				)}
			</div>

			<div className="container">
				{loading ? (
					<LoadingCard count={3}/>
				) : (
					<div className="row">
						{products &&
							products.map((p) => (
								<div className="col-md-4" key={p._id}>
									<ProductCard product={p} />
								</div>
							))}
					</div>
				)}
			</div>
		</>
	);
};

export default HomePage;
