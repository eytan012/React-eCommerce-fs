const admin = require("../firebase");
const User = require("../models/User");

exports.authCheck = async (req, res, next) => {
	try {
		const firebaseUser = await admin
			.auth()
			.verifyIdToken(req.headers.authtoken);
		req.user = firebaseUser;
		next();
	} catch (error) {
		res.status(401).json({
			err: "Invalid/Expired token",
		});
	}
};

exports.isAdmin = async(req, res, next) => {
	const { email } = req.user;
	try {
		const adminUser = await User.findOne({ email }).exec();
		if (adminUser.role !== "admin")
			res.status(401).json({ err: "Unauthorized" });
		else next();
	} catch (error) {
		console.log(error);
	}
};
