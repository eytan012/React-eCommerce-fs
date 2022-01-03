const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const {listAll} = require("../controllers/products");

// @routes
router.get("/:count",listAll);



module.exports = router;
