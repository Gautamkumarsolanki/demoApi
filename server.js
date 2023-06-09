const express = require("express");
const dotenv = require("dotenv");
const cors=require('cors');
dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:'*'}))
app.use("/api", require("./route/routes.js"));
app.use('/',(req,res)=>{
    res.send("Hey !! Welcome to my Api")
})
const PORT = process.env.PORT || 5000;
app.listen(3000, () => console.log(`server is running ${PORT}`));
