//importing mongoose
const mongoose = require("mongoose");

/**
 * Defining a schema for news
 */
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
});

//Exporting news schema
module.exports = mongoose.model("news", newsSchema, "news");
