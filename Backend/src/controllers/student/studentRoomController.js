const Room = require('../../models/Room');
const RoomApplication = require('../../models/RoomApplication');
const Tenant = require('../../models/Tenant');

const listRooms = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const rooms = await Room.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ rooms });
};


const getMyRoom = async (req, res) => {
  try {
    // find tenant for logged-in student
    const tenant = await Tenant.findOne({ email: req.user.email }).populate('room');

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // find room assigned to this tenant
    if (!tenant.room) {
      return res.status(404).json({ message: "Room not assigned" });
    }

    res.json(tenant.room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const applyRoom = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ email: req.user.email });
    if (!tenant) return res.status(400).json({ message: 'Tenant profile not found' });
    if (tenant.room) return res.status(400).json({ message: 'Already assigned a room' });

    const { roomId, reason } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const existing = await RoomApplication.findOne({
      student: tenant._id,
      room: room._id,
      status: 'pending'
    });

    if (existing) return res.status(400).json({ message: 'Application already pending' });

    const application = await RoomApplication.create({
      student: tenant._id,
      room: room._id,
      reason
    });

    // Assign room to tenant and update room status
    await Tenant.findByIdAndUpdate(tenant._id, { room: roomId });
    await Room.findByIdAndUpdate(roomId, { tenant: tenant._id, status: 'occupied' });

    res.status(201).json({ application, message: 'Room assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  listRooms,
  getMyRoom,
  applyRoom
};
