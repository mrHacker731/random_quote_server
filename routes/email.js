const { handleSendMail } = require("../controler/mailControler");

const router = require("express").Router();

router.post("/send",handleSendMail);
// router.post("/verify/otp")
module.exports = router;