import React from "react";
import { Button, Select } from "antd";

const ProductCreate = ({ handleSubmit, handleChange, values }) => {
	// destructuring from state
	const {
		title,
		description,
		price,
		categories,
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
					type="number"
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
				<select name="color" className="form-control" onChange={handleChange}>
					<option>Please Select</option>
					{colors.map((color) => (
						<option key={color}>{color}</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Brand</label>
				<select name="brand" className="form-control" onChange={handleChange}>
					<option>Please Select</option>
					{brands.map((brand) => (
						<option key={brand}>{brand}</option>
					))}
				</select>
			</div>
			<div className="form-group">
				<label>Category</label>
				<select
					name="category"
					className="form-control"
					onChange={handleChange}
				>
					{categories.length > 0 &&
						categories.map((c) => (
							<option key={c._id} value={c._id}>
								{console.log(c._id)}
								{c.name}
							</option>
						))}
				</select>
			</div>
			<Button type="primary" onClick={handleSubmit}>
				Save
			</Button>
		</form>
	);
};

export default ProductCreate;
