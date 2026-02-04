const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true},
    passwordHash: { type: String, require: true},
    role: { type: String, enum: ['admin', 'student'], default: 'student'},
    phone: String,
    avatarUrl: String,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('user', UserSchema);