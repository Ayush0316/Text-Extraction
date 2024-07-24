const mongoose = require("mongoose");
const Data = require("./dataModel");

const pageSchema = new mongoose.Schema({
  image: String,
  data: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Data,
  },
});

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
