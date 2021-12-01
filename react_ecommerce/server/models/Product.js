const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		  },
		description: {
			type: String,
			required: true,
			maxlength: 2000,
			text: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
			min: 0,
			max: 999999,
		},
		category: {
			type: ObjectId,
			ref: "Category",
		},
		// subs: [
		// 	{
		// 		type: ObjectId,
		// 		ref: "Sub",
		// 	},
		// ],
		quantity: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		// images: {
		// 	type: Array,
		// },
		shipping: {
			type: String,
			enum: ["Yes", "No"],
		},
		color: {
			type: String,
			enum: [
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
		},
		brand: {
			type: String,
			enum: [
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
		},
		// ratings:[
		//     {
		//         star: Number,
		//         postedBy: {type: ObjectId, ref: "User"},
		//     }
		// ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
