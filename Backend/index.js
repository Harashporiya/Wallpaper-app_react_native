const express = require("express")
const app = express();
const PORT = 8001;
const mongoose = require("mongoose")
const User = require("./model/user")
const userRouter = require("./route/user")
const cors = require("cors")
const editRouter = require("./route/edit")

const jwt = require("jsonwebtoken")


const secretkey = "snsjsnisjehyrhdbbsiskednj";

mongoose.connect("mongodb://127.0.0.1:27017/walpaper", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));


// app.get("/user", (req,res)=>{
//     return res.send("harash")
// })

app.get("/user/data", async (req, res) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1]; 
  try {
    const decoded = jwt.verify(token, secretkey);
    const user = await User.findById(decoded.userId, 'email username'); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ email: user.email, username: user.username });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/bio",editRouter);

app.listen(PORT,'0.0.0.0',()=>console.log(`Server Started At PORT ${PORT}`))    
