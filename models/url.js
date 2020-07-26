const mongoose = require("mongoose");
//const shortId = require("shortid");

const schema = mongoose.Schema
const urlSchema = new schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,

  }
})

module.exports = mongoose.model('Url', urlSchema)