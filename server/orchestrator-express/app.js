const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const axios = require("axios");

const SERVER_USER_URL = "http://localhost:4001";
const SERVER_APP_URL = "http://localhost:4002";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.json(`Hello to Express's World!`));

app.use("/posts", require("./routes/postRouter"));

app.use("/users", require("./routes/userRouter"));

app.listen(port, () => {
  console.log(`EXPRESS: Listening from port ${port}`);
});
