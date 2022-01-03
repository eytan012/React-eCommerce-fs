import React from "react";
import { Button, Select } from "antd";

const ProductUpdateForm = ({
	values,
	categories,
	subOptions,
	handleSubmit,
	handleCategoryChange,
	handleChange,
	setValues,
	arrayOfSubs,
	setArrayOfSubIds,
}) => {
	const {
		title,
		description,
		price,
		category,
		subs,
		shipping,
		quantity,
		images,
		colors,
		brands,
		color,
		brand,
	} = values;

	return (
		<form>
			<div className="form-group">
				<label>Title</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Title"
					name="title"
					value={title}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Description</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Title"
					name="description"
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Price</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter Price"
					name="price"
					value={price}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Shipping</label>
				<select
					value={shipping === "Yes" ? "Yes" : "No"}
					name="shipping"
					className="form-control"
					onChange={handleChange}
				>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>
			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					className="form-control"
					placeholder="Enter Quantity"
					name="quantity"
					value={quantity}
					onChange={handleChange}
				></input>
			</div>
			<div className="form-group">
				<label>Color</label>
				<select
					value={color}
					name="color"
					className="form-control"
					onChange={handleChange}
				>
					{colors.map((color) => (
						<option key={color}>{color}</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Brand</label>
				<select
					value={brand}
					name="brand"
					className="form-control"
					onChange={handleChange}
				>
					{brands.map((brand) => (
						<option key={brand}>{brand}</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Category *</label>
				<select
					name="category"
					className="form-control"
					onChange={handleCategoryChange}
				>
					<option>{category ? category.name : "Please Select"}</option>
					{categories.length > 0 &&
						categories.map((c) => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<label>Sub Categories</label>
				<span style={{ fontSize: ".6rem", marginLeft: "1rem" }}>
					You can select multiple categories
				</span>
				<Select
					placeholder="Please select"
					style={{ width: "100%" }}
					value={arrayOfSubs}
					onChange={(value) => setArrayOfSubIds(value)}
					mode="multiple"
					allowClear
				>
					{subs.map(({ _id, name }) => (
						<Select.Option key={name} value={_id}>
							{name}
						</Select.Option>
					))}
				</Select>
			</div>
			<Button type="primary" onClick={handleSubmit}>
				Save
			</Button>
		</form>
	);
};

export default ProductUpdateForm;
