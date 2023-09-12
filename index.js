const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { notFound } = require("./middleware");
const { errHandler } = require("./middleware");
const { CreateDb } = require("./dbconfig");
const { Router } = require("./route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : ["*"]
}))

app.get("/", (req, res) => {
  res.send("Backend Home page");
});

app.use("/api", Router);

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT;

const startApp = async () => {
  try {
    await CreateDb();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();

module.exports = app
