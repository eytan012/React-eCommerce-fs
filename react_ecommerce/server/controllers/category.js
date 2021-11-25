const Category = require("../models/category");
const slugify = require("slugify");

// create new category
exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		const slug = slugify(name).toLowerCase();
		const category = await new Category({ name, slug }).save();
		res.json(category);
	} catch (err) {
		res.status(400).json({ err: "Create category failed" });
	}
};

// get all categories
exports.list = async (req, res) => {
	try {
		const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
		res.json(categories);
	} catch (err) {
		console.log(error);
	}
};

// get category by slug
exports.read = async (req, res) => {
	try {
		const { slug } = req.params;
		const category = await Category.findOne({ slug }).exec();
		res.json(category);
	} catch (err) {
		res.status(400).json({ err: "Get category failed" });
		console.log(error);
	}
};

// update category by slug
exports.update = async (req, res) => {
	try {
		const { slug } = req.params;
		const {name:{name}} = req.body;
		const slugUpdate = slugify(name).toLowerCase();
		const updatedCategory = await Category.findOneAndUpdate(
			{ slug },
			{ name, slug: slugUpdate },
			{ new: true }
		).exec();
        res.json(updatedCategory);
	} catch (err) {
		res.status(400).json({ err: "Update category failed" });
		console.log(error);
	}
};

// delete category by slug
exports.remove = async (req, res) => {
	try {
		const { slug } = req.params;
		const category = await Category.findOneAndDelete({ slug }).exec();
		res.json(category);
	} catch (err) {
		res.status(400).json({ err: "Delete category failed" });
		console.log(error);
	}
};
