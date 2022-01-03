const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const { create, remove, read ,update} = require("../controllers/product");

// @routes
router.post("/", authCheck, isAdmin, create);
router.get("/:slug", read);
router.delete("/:slug", authCheck, isAdmin, remove);
router.put("/:slug", authCheck, isAdmin, update);

module.exports = router;
