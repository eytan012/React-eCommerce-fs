import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminSideNav from "../../../components/nav/AdminSideNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import { Divider } from "antd";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../services/categories";

const CategoryUpdate = () => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();
	const {location: { pathname },} = useHistory();
    const slug = pathname.split("/")[3]


	useEffect(() => {
        loadCategory()
	}, []);

    const loadCategory = async()=>{
        const {data} = await getCategory(slug)
        setName(data.name)
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
          const res = await updateCategory(slug, {name}, user.token)
          console.log(res);
		} catch (error) {
            console.log(error);
			console.log(error?.response?.data?.err);
			if (error?.response?.status === 400) toast.error(error?.response?.data?.err);
			toast.error(error);
		}
		setLoading(false);
        history.push("/admin/category")
	};


	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminSideNav />
				</div>
				<div className="col-md-6">
					<h5 className="mt-3">Update Category</h5>
					<Divider />
					{loading ? (
						<p className="text-primary">Loading...</p>
					) : (
						<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
