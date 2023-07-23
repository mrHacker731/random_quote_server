const { createNewUser, userLogin, getUserById, resetPassword } = require("../controler/authControler");
const verifyUser = require("../utils/verifyUser");

const router = require("express").Router();

router.post("/create/new/user",createNewUser);
router.post("/verify/user",userLogin);
router.get("/get/user/:id",getUserById);
router.put("/reset/password",resetPassword);

module.exports = router;