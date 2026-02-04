const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    fromDate: Date,
    toDate: Date,
    reason: String,
    status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

module.exports = mongoose.model('Leave', LeaveSchema);
