const mongoose = require('mongoose');

const RoomApplicationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
    reason: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

module.exports = mongoose.model('RoomApplication', RoomApplicationSchema);
