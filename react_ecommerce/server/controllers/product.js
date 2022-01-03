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
exports.read = async (req, res) => {
	const slug = req.params.slug;
	try {
		const product = await Product.findOne({ slug })
			.populate("category")
			.populate("subs")
			.exec();
		res.status(200).json({ product });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: error.message,
		});
	}
};
exports.remove = async (req, res) => {
	const slug = req.params.slug;
	try {
		const deleted = await Product.findOneAndRemove({ slug }).exec();
		res.status(200).json(deleted);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: error.message,
		});
	}
};

exports.update = async (req, res) => {
	const slug = req.params.slug;
	try {
		if (req.body.title) req.body.slug = slugify(req.body.title);
		const updated = await Product.findOneAndUpdate({ slug: slug }, req.body, {
			new: true,
		}).exec();
		res.status(200).json(updated);
	} catch (error) {
		console.log("update error: ", error);
		res.status(400).json({
			error: error.message,
		});
	}
};
