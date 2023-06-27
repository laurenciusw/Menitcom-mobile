if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// console.log(process.env);
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const MongoDBconnection = require("./config/mongoConnection");
const UserController = require("./controllers/userController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoDBconnection.connect();

// app.get("/", UserController.allUser);
app.use("/users", require("./routes/userRouter"));

app.listen(port, () => {
  console.log(`Aplication is Running`);
});
