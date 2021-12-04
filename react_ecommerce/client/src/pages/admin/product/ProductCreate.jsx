import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import ProductForm from "../../../components/forms/ProductForm";
import FileUpload from "../../../components/forms/FileUpload";
import { createProduct } from "../../../services/product";
import { getCategories, getCategorySubs } from "../../../services/categories";
import { Divider } from "antd";
import { toast } from "react-toastify";

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
	const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.user);
	const history = useHistory();

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		const { data } = await getCategories();
		setValues({ ...values, categories: data });
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

	const handleCategoryChange = async (e) => {
		e.preventDefault();
		if (e.target.value === "Please Select") {
			setSubOptions([]);
			return;
		}
		setValues({ ...values, subs: [], category: e.target.value });
		const { data } = await getCategorySubs(e.target.value);
		setSubOptions(data);
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
					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
							loading={loading}
						/>
					</div>
					<ProductForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						handleCategoryChange={handleCategoryChange}
						values={values}
						subOptions={subOptions}
						setValues={setValues}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;
