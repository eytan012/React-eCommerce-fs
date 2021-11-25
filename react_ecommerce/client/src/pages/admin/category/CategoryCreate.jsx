import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import InputSearch from '../../../components/forms/InputSearch'
import { Divider, } from "antd";
import {
	DeleteOutlined,
	EditOutlined,

} from "@ant-design/icons";
import { toast } from "react-toastify";
import {
	createCategory,
	getCategories,
	removeCategory,
} from "../../../services/categories";

const CategoryCreate = () => {
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		const { data } = await getCategories();
		setCategories(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await createCategory({ name }, user.token);
			toast.success(`Category "${res?.data?.name}" created successfully`);
			loadCategories();
		} catch (error) {
			console.log(error?.response?.data?.err);
			if (error.response.status === 400) toast.error(error.response.data.err);
			toast.error(error);
		}
		setName("");
		setLoading(false);
	};

	const handleDelete = async (name) => {
		setLoading(true);
		try {
			await removeCategory(name, user.token);
			toast.success(`Category "${name}" deleted successfully`);
			loadCategories();
		} catch (error) {
			console.log(error?.response?.data?.err);
			if (error.response.status === 400) toast.error(error.response.data.err);
			toast.error(error);
		}
		setLoading(false);
	};


	const searched = (search) => (c) =>
		c.name.toLowerCase().includes(search.toLowerCase());

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
				<div className="col-md-6">
					<h5 className="mt-3">Add Category</h5>
					<Divider />
					{loading ? (
						<p className="text-primary">Loading...</p>
					) : (
						<CategoryForm
							name={name}
							setName={setName}
							handleSubmit={handleSubmit}
						/>
					)}
					<h5 className="mt-3">Categories</h5>
					<Divider />
					<InputSearch search={search} setSearch={setSearch}/>
					{categories.length > 0 &&
						categories.filter(searched(search)).map((c) => {
							return (
								<div className="alert alert-secondary" key={c._id}>
									{c.name}
									<span
										className="btn btn-sm float-right text-danger"
										onClick={() => handleDelete(c.slug)}
									>
										<DeleteOutlined />
									</span>
									<Link to={`/admin/category/${c.slug}`}>
										<span className="btn btn-sm float-right">
											<EditOutlined />
										</span>
									</Link>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
