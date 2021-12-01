import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import ProductForm from "../../../components/forms/ProductForm";
import { Divider } from "antd";
import { toast } from "react-toastify";
import { createProduct } from "../../../services/product";
import { getCategories } from "../../../services/categories";

const initialValues = {
	title: "",
	description: "",
	price: "",
	categories: [],
	category: "",
	subs: [],
	shipping: "",
	quantity: "",
	images: [],
	colors: [
		"Red",
		"Blue",
		"Green",
		"Yellow",
		"Black",
		"White",
		"Pink",
		"Purple",
		"Orange",
		"Brown",
		"Grey",
		"Silver",
		"Gold",
	],
	brands: [
		"Apple",
		"Samsung",
		"Xiaomi",
		"Oppo",
		"Realme",
		"Vivo",
		"Nokia",
		"Sony",
		"LG",
		"Motorola",
		"Huawei",
	],
	color: "",
	brand: "",
};

const ProductCreate = () => {
	const [values, setValues] = useState(initialValues);
	const [categories, setCategories] = useState([]);
	const { token } = useSelector((state) => state.user);
	const history = useHistory();

	useEffect(() => {
		loadCategories();
	}, []);
	
	const loadCategories = async () => {
		const { data } = await getCategories();
		setValues({...values, categories: data});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await createProduct(values, token);
			toast.success(`Product ${res?.data?.title} has been created`);
			// history.replace("/") // redirect to home page
		} catch (error) {
			toast.error(error?.response?.data?.error);
			console.log(error);
		}
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
				<div className="col-md-6">
					<h5 className="mt-3">Create Product</h5>
					<Divider />
					<ProductForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
