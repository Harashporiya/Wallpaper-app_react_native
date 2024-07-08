const express = require("express")
const app = express();
const PORT = 8001;
const mongoose = require("mongoose")
const User = require("./model/user")
const userRouter = require("./route/user")
const cors = require("cors")

mongoose.connect("mongodb://127.0.0.1:27017/walpaper", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));


// app.get("/user", (req,res)=>{
//     return res.send("harash")
// })

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.listen(PORT,'0.0.0.0',()=>console.log(`Server Started At PORT ${PORT}`))    
