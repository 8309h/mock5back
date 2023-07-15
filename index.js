const express = require("express");
const connection = require("./config/db");
const {authontication} = require("./middleware/authontication.middlware")
const UserRouter = require("./routes/user.routes");
const EmpRouter = require("./routes/emp.routes");
const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.status(200).send("Welcome to employee management2");
});

app.use("/user",UserRouter);
app.use(authontication);

app.get("/auth", (req, res) => {
  res.send("Authentication successful route");
});

app.use(EmpRouter);

const PORT = process.env.PORT || 8080;

app.listen(8080, async () => {
    console.log(`Server runs at ${process.env.PORT}`);
    try {
      await connection
      console.log("Connected to DB Successfully");
    } catch (err) {
        console.log(err)
      console.log("Not connected to DB");
    }
  });
