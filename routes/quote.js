const { createQuote, updateQuote, getAllQuote, getRandomQuote, getQuoteById } = require("../controler/quoteControler");
const verifyUser = require("../utils/verifyUser");

const router = require("express").Router();

router.post("/create/new",createQuote);
router.put("/update/:id",updateQuote);
router.get("/get/all",getAllQuote);
router.get("/get/random",verifyUser,getRandomQuote);
router.get("/get/:id",getQuoteById);

module.exports = router;