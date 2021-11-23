const { app } = require('firebase-admin');

const router = require('express').Router();


router.get("/user",(req,res)=>{
    res.send("user");
})

module.exports = router;