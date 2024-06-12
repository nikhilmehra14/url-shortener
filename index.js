const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
const { connectToMongoDB } = require("./connect");
const app = express();

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected successfully."))
  .catch((error) => console.log(`MongoDB Error: ${error}`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));
