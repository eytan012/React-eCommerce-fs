const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const { upload, remove } = require("../controllers/cloudinary");

// @routes

// PRIVATE
router.post("/uploadImages", authCheck, isAdmin, upload); // list all categories public route
router.post("/removeImage", authCheck, isAdmin, remove); //read category public route

module.exports = router;
