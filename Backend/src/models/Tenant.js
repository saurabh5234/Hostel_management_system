const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Link to User model
    checkInDate: Date,
    status: { type: String, enum: ['active', 'inactive', 'evicted'], default: 'active' },
    monthlyRent: Number,
    securityDeposit: Number,
    emergencyContact: String,
    occupation: String,
    proofType: String,
    address: String,
    avatarUrl: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Tenant', TenantSchema);