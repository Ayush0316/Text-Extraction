const mongoose = require("mongoose");

const data = {
  topx: Number,
  topy: Number,
  bottomx: Number,
  bottomy: Number,
  value: String,
};

const dataSchema = new mongoose.Schema({
  key: data,
  value: data,
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
