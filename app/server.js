const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = "mongodb://127.0.0.1:27017"

mongoose.connect(DB).then(() => {
  console.log("DB Connection successful");
  const port = 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port} . . .`);
  });
});
