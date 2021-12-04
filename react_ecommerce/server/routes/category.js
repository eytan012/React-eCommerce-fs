const router = require("express").Router();

//middleware
const { authCheck, isAdmin } = require("../middlewares/auth");

//controller
const {list,create,read,update,remove,getSubs} = require("../controllers/category");

// @routes 

// PUBLIC
router.get("/categories", list); // list all categories public route
router.get("/category/:slug", read); //read category public route

// PRIVATE
router.post("/category", authCheck, isAdmin, create); //create category if admin
router.put("/category/:slug", authCheck, isAdmin, update); //update category if admin
router.delete("/category/:slug", authCheck, isAdmin, remove); //remove category if admin
router.get("/category/subs/:_id",getSubs); //get subs of category


module.exports = router;
