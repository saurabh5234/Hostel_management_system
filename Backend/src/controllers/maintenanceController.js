const Maintenance = require("../models/Maintenance");

exports.getAllComplaints = async (req, res) => {
  const complaints = await Maintenance.find()
    .populate("tenant")
    .sort({ createdAt: -1 });
  res.json(complaints);
};

exports.updateStatus = async (req, res) => {
  await Maintenance.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Status updated" });
};
