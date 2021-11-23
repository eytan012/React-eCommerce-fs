const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// @routes  
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, isAdmin, currentUser);

module.exports = router;
