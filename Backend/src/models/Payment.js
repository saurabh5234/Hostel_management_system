const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'},
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    type: { type: String, enum: ['rent', 'deposit', 'maintenance', 'electricity', 'other']},
    amount: Number,
    dueDate: Date,
    paidDate: Date,
    status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending'},
    paymentMethod: { type: String, enum: ['cash', 'upi', 'card', 'bank'], default: 'cash'},
    notes: String,
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Payment', PaymentSchema);
