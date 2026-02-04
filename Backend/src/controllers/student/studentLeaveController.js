const Leave = require('../../models/Leave');
const Tenant = require('../../models/Tenant');

const applyLeave = async (req, res) => {
    const tenant = await Tenant.findOne({ email: req.user.email });
    if(!tenant) return res.status(400).json({ message: 'Tenant not found' });

    const { fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
        student: tenant._id,
        fromDate,
        toDate,
        reason
    });

    res.status(201).json({ leave });
};

const myLeaves = async (req, res) => {
    const tenant = await Tenant.findOne({ email: req.user.email });
    if(!tenant) return res.status(400).json({ message: 'Tenant not found' });

    const leaves = await Leave.find({ student: tenant._id }).sort({ createdAt: -1 });

    res.json({ leaves });
};

const getLeave = async (req, res) => {
    const leave = await Leave.findById(req.params.id);
    if(!leave) return res.status(404).json({ message: 'Not found' });

    const tenant = await Tenant.findOne({ email: req.user.email });

    if(String(leave.student) !== String(tenant._id))
        return res.status(403).json({ message: 'Forbidden' });

    res.json({ leave });
};

module.exports = { applyLeave, myLeaves, getLeave };
