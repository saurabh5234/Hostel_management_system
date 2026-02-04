const Room = require('../models/Room');

exports.list = async (req, res, next) => {
  try {
    const { status, q, floor, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (floor) filter.floor = Number(floor);
    if (type) filter.type = type;
    if (q) filter.$or = [
      { number: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
    const rooms = await Room.find(filter).populate('tenant', 'fullName email');
    res.json(rooms);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('tenant', 'fullName email');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(room);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) { next(err); }
};
