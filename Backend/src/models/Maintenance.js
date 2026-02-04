const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Maintenance", maintenanceSchema);
