const express = require("express");
require("dotenv").config()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DeveloperRouter } = require("./routes/Developer.routes");
const { clientRouter } = require("./routes/Client.routes");
const { isAuth } = require("./Middleware/auth.Middleware");
const {connection}=require('./db')

const app = express();



app.use(express.json());

app.use(cors());

app.use("/developers", isAuth, DeveloperRouter);
app.use("/clients", clientRouter);

const PORT = process.env.PORT ;
app.listen(PORT, async(res,req) => {
  try{
await connection;
console.log("bhai acha mai chalta hu")
  }
  catch(err){
    console.log(`Server is running on port ${PORT}`);
  }
});
