const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const {list,create,read,update,remove} = require("../controllers/sub");

// @routes 

// PUBLIC
router.get("/subs", list); // list all categories public route
router.get("/sub/:slug", read); //read category public route

// PRIVATE
router.post("/sub", authCheck, isAdmin, create); //create category if admin
router.put("/sub/:slug", authCheck, isAdmin, update); //update category if admin
router.delete("/sub/:slug", authCheck, isAdmin, remove); //remove category if admin


module.exports = router;
