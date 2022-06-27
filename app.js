const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

//dotenv require call
require("dotenv").config();
const PORT = process.env.PORT || 5000;
//database connection
require("./db");
//request purse
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_NAME));

//application all routes handle
app.use("/user", userRoute);
app.use("/profile", postRoute);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("home page");
  });
}

//listening server
app.listen(PORT, () => {
  console.log(`the server is running on port http://localhost:${PORT}`);
});
