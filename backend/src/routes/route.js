// <<========================[ Import ]===========================>>
const express = require("express");
const router = express.Router();
const registerController = require('../controllers/registerController')

const middleware = require('../middleware/auth')
const resetPasswordController = require('../controllers/resetPasswordController')


//===================( User Apis )========================>

router.post("/register", registerController.userSignup)
router.post("/login", registerController.userLogin)
router.post("/getuser", middleware.authentication,registerController.getUser)
router.post("/sendpasswordlink", resetPasswordController.sendLink)
 router.get("/forgotpassword/:id/:token",resetPasswordController.verifyforgetPassword)
 router.post("/:id/:token",resetPasswordController.changePassword)
//===================( Export )========================>
module.exports = router