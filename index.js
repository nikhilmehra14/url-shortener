const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const app = express();
const urlRoute = require("./routes/url");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected successfully."))
  .catch((error) => console.log(`MongoDB Error: ${error}`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));
