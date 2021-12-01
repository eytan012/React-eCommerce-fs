const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const {create,read} = require("../controllers/product");

// @routes
router.post("/", authCheck, isAdmin, create);
router.get("/products",read);



module.exports = router;
