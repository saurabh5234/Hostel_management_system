const Payment = require('../../models/Payment');
const Tenant = require('../../models/Tenant');

const myPayments = async (req, res) => {
    const tenant = await Tenant.findOne({ email: req.user.email });
    if(!tenant) return res.status(400).json({ message: 'Tenant not found' });
    const payments = await Payment.find({ tenant: tenant._id }).sort({ createdAt: -1 });
    res.json({ payments });
};

const duePayments = async (req, res) => {
    const tenant = await Tenant.findOne({ email: req.user.email }).populate('room');
    if(!tenant) return res.status(400).json({ message: 'Tenant not found' });
    const unpaid = await Payment.find({
        tenant: tenant._id,
        status: { $in: ['pending', 'overdue'] }
    });
    res.json({ unpaid, tenant });
};

const pay = async (req, res) => {
    const { amount, type = 'rent', paymentMethod = 'upi', reference } = req.body;
    const tenant = await Tenant.findOne({ email: req.user.email });
    if(!tenant) return res.status(400).json({ message: 'Tenant not found' });

    const payment = await Payment.create({
        tenant: tenant._id,
        room: tenant.room,
        type,
        amount,
        paidDate: new Date(),
        status: 'paid',
        paymentMethod,
        notes: reference
    });

    res.status(201).json({ payment });
};

module.exports = { myPayments, duePayments, pay };
