import React, { useState, useEffect,  } from "react";
import { useSelector } from "react-redux";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import InputSearch from "../../../components/forms/InputSearch";
import { Divider, Select } from "antd";
import { toast } from "react-toastify";
import { getCategories } from "../../../services/categories";
import { createSub, getSubs, removeSub } from "../../../services/sub";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SubCreate = () => {
	const [categories, setCategories] = useState([]);
	const [subs, setSubs] = useState([]);
	const [category, setCategory] = useState(null);
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const [search, setSearch] = useState("");

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const loadCategories = async () => {
		const { data } = await getCategories();
		setCategories(data);
	};

	const loadSubs = async () => {
		const { data } = await getSubs();
		setSubs(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await createSub(name, { parent: category }, user.token);
			toast.success(`Sub category "${res?.data?.name}" created successfully`);
			loadSubs();
		} catch (error) {
			console.log(error?.response?.data?.err);
			if (error?.response?.status === 400)
				toast.error(error?.response?.data?.err);
			toast.error(error);
		}
		setName("");
		setLoading(false);
	};

	const handleDelete = async (name) => {
		setLoading(true);
		try {
			await removeSub(name, user.token);
			toast.success(`Sub Category "${name}" deleted successfully`);
			loadSubs();
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

					<span className="mr-2">
						Parent Category:{" "}
					</span>
					<Select
						id="select"
						showArrow
						placeholder="Select Category"
						onChange={(e) => setCategory(e)}
					>
						{categories.length > 0 &&
							categories.map((c) => (
								<Select.Option key={c._id} value={c.id}>
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
					{subs.length > 0 &&
						subs.filter(searched(search)).map((s) => {
							return (
								<div className="alert alert-secondary" key={s._id}>
									{s.name}
									<span
										className="btn btn-sm float-right text-danger"
										onClick={() => handleDelete(s.slug)}
									>
										<DeleteOutlined />
									</span>
									<Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
