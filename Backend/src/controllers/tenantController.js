const Tenant = require('../models/Tenant');
const Room = require('../models/Room');

exports.list = async (req, res, next) => {
  try {
    const tenants = await Tenant.find().populate('room', 'number type floor');
    res.json(tenants);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { room: roomId } = req.body;
    const tenant = await Tenant.create(req.body);

    if (roomId) {
      await Room.findByIdAndUpdate(roomId, { tenant: tenant._id, status: 'occupied' });
    }
    res.status(201).json(tenant);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate('room');
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json(tenant);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tenant);
  } catch (err) { next(err); }
};

exports.remove = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // ✅ Free room if assigned
    if (tenant.room) {
      await Room.findByIdAndUpdate(
        tenant.room,
        { tenant: null, status: "vacant" }
      );
    }

    // ✅ Use modern delete method
    await Tenant.findByIdAndDelete(req.params.id);

    res.json({ message: "Tenant removed successfully" });
  } catch (error) {
    console.error("Error deleting tenant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

