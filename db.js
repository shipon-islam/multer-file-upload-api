const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("database connection successful"))
  .catch((err) => console.log(err));
