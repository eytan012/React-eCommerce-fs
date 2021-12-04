const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const {create,listAll} = require("../controllers/product");

// @routes
router.post("/", authCheck, isAdmin, create);
router.get("/:count",listAll);



module.exports = router;
