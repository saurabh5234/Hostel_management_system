const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    type: { type: String, enum: ['single','double','triple','suite'], default:'single'},
    floor: Number,
    monthlyRent: Number,
    securityDeposit: Number,
    status: { type: String, enum: ['vacant', 'occupied', 'maintenance'], default: 'vacant'},
    amenities: {
        wifi: { type: Boolean, default: false },
        ac: { type: Boolean, default: false },
        tv: { type: Boolean, default: false },
        parking: { type: Boolean, default: false },
        food: { type: Boolean, default: false}
    },
    description: String,
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null }
});

module.exports = mongoose.model('Room', RoomSchema);
