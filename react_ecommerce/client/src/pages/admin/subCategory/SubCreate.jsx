import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import InputSearch from "../../../components/forms/InputSearch";
import { Divider, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { getCategories } from "../../../services/categories";
import { createSub, getSubs, removeSub } from "../../../services/sub";

const SubCreate = () => {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState(null);
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
			const res = await createSub({ name }, user.token);
			toast.success(`Category "${res?.data?.name}" created successfully`);
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
			await removeSub(name, user.token);
			toast.success(`Category "${name}" deleted successfully`);
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
					<h5 className="mt-3">Add Sub Category</h5>
					<Divider />

					<span className="mr-2">Parent Category: </span>
					<Select
						showArrow
						placeholder="Select Category"
						onChange={(e) => setCategory(e)}
					>
						{categories.length > 0 &&
							categories.map((c) => (
								<Select.Option key={c._id} value={c.name}>
									{c.name}
								</Select.Option>
							))}
					</Select>

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
					<InputSearch search={search} setSearch={setSearch} />
					{/* {categories.length > 0 &&
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
						})} */}
				</div>
			</div>
		</div>
	);
};

export default SubCreate;
