import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import CategoryForm from "../../../components/forms/CategoryForm";

import { Divider, Select } from "antd";
import { toast } from "react-toastify";
import { getCategories } from "../../../services/categories";
import {
	getSub,
	updateSub,
} from "../../../services/sub";

const SubUpdate = () => {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState(null);
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	const history = useHistory();
	const {
		location: { pathname },
	} = useHistory();
	const slug = pathname.split("/")[3];

	useEffect(() => {
		loadCategories();
		loadSub();
	}, []);

	const loadCategories = async () => {
		const { data } = await getCategories();
		setCategories(data);
	};

	const loadSub = async () => {
		const { data } = await getSub(slug);
		setName(data?.name);
		setCategory(data?.parent);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await updateSub(slug, { name, parent: category }, user.token);
			toast.success(`Sub category "${res?.data?.name}" updated successfully`);
			console.log(res);
			// loadSubs();
		} catch (error) {
			console.log(error?.response?.data?.err);
			if (error?.response?.status === 400)
				toast.error(error?.response?.data?.err);
			toast.error(error);
		}
		setName("");
		setLoading(false);
		history.push("/admin/sub");
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
				<div className="col-md-6">
					<h5 className="mt-3">Update Sub Category</h5>
					<Divider />

					<span className="mr-2">Parent Category: </span>
					<Select
						id="select"
						showArrow
						placeholder="Select Category"
						onChange={(e) => setCategory(e)}
						value={category}
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
				</div>
			</div>
		</div>
	);
};

export default SubUpdate;
