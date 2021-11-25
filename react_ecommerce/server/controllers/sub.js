const Sub = require("../models/SubCategory");
const slugify = require("slugify");

// create new category
exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		const slug = slugify(name).toLowerCase();
		const sub = await new Sub({ name, slug }).save();
		res.json(sub);
	} catch (err) {
		res.status(400).json({ err: "Create sub category failed" });
	}
};

// get all categories
exports.list = async (req, res) => {
	try {
		const subs = await Sub.find({}).sort({ createdAt: -1 }).exec();
		res.json(subs);
	} catch (err) {
		console.log(error);
	}
};

// get category by slug
exports.read = async (req, res) => {
	try {
		const { slug } = req.params;
		const sub = await Sub.findOne({ slug }).exec();
		res.json(sub);
	} catch (err) {
		res.status(400).json({ err: "Get sub category failed" });
		console.log(error);
	}
};

// update category by slug
exports.update = async (req, res) => {
	try {
		const { slug } = req.params;
		const {name:{name}} = req.body;
		const slugUpdate = slugify(name).toLowerCase();
		const updatedSub = await Sub.findOneAndUpdate(
			{ slug },
			{ name, slug: slugUpdate },
			{ new: true }
		).exec();
        res.json(updatedSub);
	} catch (err) {
		res.status(400).json({ err: "Update sub category failed" });
		console.log(error);
	}
};

// delete category by slug
exports.remove = async (req, res) => {
	try {
		const { slug } = req.params;
		const sub = await Sub.findOneAndDelete({ slug }).exec();
		res.json(sub);
	} catch (err) {
		res.status(400).json({ err: "Delete sub category failed" });
		console.log(error);
	}
};
