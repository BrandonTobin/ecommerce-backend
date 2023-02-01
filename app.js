const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.connection");
const usersController = require("./controllers/userController");
const gamesController = require("./controllers/gamesController");
const reviewsController = require("./controllers/reviewsController");
require("dotenv").config();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("/users", usersController);
app.use("/posts", gamesController);
app.use("/comments", reviewsController);

app.get("/", (req, res) => {
  res.redirect("/authors");
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));