const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.upload = async (req, res) => {
	// getting from req.body.image, json string with the images binary data
	const result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`, //a name
		resource_type: "auto", //jpg,jpeg ect..
	});
	res.json({
		public_id: result.public_id,
		url: result.secure_url,
	});
};

exports.remove = async (req, res) => {
	const image_id = req.body.public_id;
    try {
    await cloudinary.uploader.destroy(image_id)
    res.status(200).json({msg:"deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: error});
    }
};
