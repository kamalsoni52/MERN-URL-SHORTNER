const express =require("express")
const { handleUserSignUp,handleUserLogin, handleUserLRefresh } =require ("../controllers/user")
const router =express.Router();
router.post("/signup", handleUserSignUp)
router.post("/login",handleUserLogin)


module.exports = router