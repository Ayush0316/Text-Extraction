const mongoose = require("mongoose");
const Page = require("./pageModel");

const documentSchema = new mongoose.Schema({
  name:String,
  pages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Page,
  },
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
