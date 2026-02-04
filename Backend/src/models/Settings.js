const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  hostelName: String,
  email: String,
  phone: String,
  address: String
});

module.exports = mongoose.model("Settings", SettingsSchema);
