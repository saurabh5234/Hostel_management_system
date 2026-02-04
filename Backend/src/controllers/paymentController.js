const Payment = require('../models/Payment');

exports.list = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate('tenant', 'fullName').populate('room', 'number');
    res.json(payments);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(payment);
  } catch (err) { next(err); }
};
