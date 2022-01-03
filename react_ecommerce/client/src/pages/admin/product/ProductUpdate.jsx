import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { getProduct, updateProduct } from "../../../services/product";
import { getCategories, getCategorySubs } from "../../../services/categories";
import { Divider } from "antd";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
const initialValues = {
	title: "",
	description: "",
	price: 0,
	category: "",
	subs: [],
	shipping: "",
	quantity: 0,
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

const ProductUpdate = () => {
	const [values, setValues] = useState(initialValues);
	const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [arrayOfSubs, setArrayOfSubIds] = useState([]);
	const [loading, setLoading] = useState(false);
	const { token } = useSelector((state) => state.user);
	const history = useHistory();
	const slug = history.location.pathname.split("/")[3];

	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	const loadProduct = async () => {
		const { data } = await getProduct(slug);
		setValues({ ...values, ...data.product });
		const res = await getCategorySubs(data.product._id);
		console.log("get catory subs: ", res);
		setSubOptions(res.data);
		let arr = [];
		data.product.subs.forEach((s) => arr.push(s._id));
		setArrayOfSubIds((prevState) => arr);
	};
	const loadCategories = async () => {
		const { data } = await getCategories();
		setCategories(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			values.subs = arrayOfSubs;
			// values.category = selectedCategory ? selectedCategory : values.category;
			const res = await updateProduct(slug, values, token);
			console.log(res);
			toast.success("Product has been updated!");
			setLoading(false);
			history.push("/admin/products")
		} catch (error) {
			setLoading(false);
			toast.error(`${error}`);
		}
	};
	const handleChange = (e) => {
		e.preventDefault()
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
		setArrayOfSubIds([]);
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
				<div className="col-md-6">
					<h5 className="mt-3">Update Product</h5>
					<Divider />
					{loading ? (
						<LoadingOutlined />
					) : (
						<>
							<div className="p-3">
								<FileUpload
									values={values}
									setValues={setValues}
									setLoading={setLoading}
									loading={loading}
								/>
							</div>
							<ProductUpdateForm
								values={values}
								setValues={setValues}
								categories={categories}
								subOptions={subOptions}
								arrayOfSubs={arrayOfSubs}
								setArrayOfSubIds={setArrayOfSubIds}
								handleSubmit={handleSubmit}
								handleChange={handleChange}
								handleCategoryChange={handleCategoryChange}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;
