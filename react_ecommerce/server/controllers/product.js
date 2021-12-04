const Product = require("../models/Product");
const slugify = require("slugify");

exports.create = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		const newProduct = await new Product(req.body).save();
		res.json(newProduct);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: error.message,
		});
	}
};

exports.listAll = async (req, res) => {
	try {
		const products = await Product.find({})
			.limit(parseInt(req.params.count))
			.populate("category")
			.populate("subs")
			.exec();
		res.json(products);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: error.message,
		});
	}
};
