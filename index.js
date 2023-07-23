const express = require('express');
const app = express();
require("dotenv").config();
const dbConnect = require("./db/dbConnect");
const authRouter = require("./routes/auth");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const quoteRouter = require("./routes/quote");
const mailRouter = require("./routes/email");

app.use(cors({
    credentials:true,
    origin:`${process.env.ORIGIN_URL}`
}));
app.use(cookie_parser());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/quote",quoteRouter);
app.use("/api/email",mailRouter);

app.get('/', (req, res) => {
    res.send("hello world!");
})

dbConnect();
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("listening on port "+port);
})