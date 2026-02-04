const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Tenant = require('../../models/Tenant');

const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if(existing) return res.status(409).json({ message: 'Email already exists' });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash, phone, role: 'student' });
    await Tenant.create({ fullName: name, email, phone });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

const me = async (req, res) => {
    const user = req.user;
    const tenant = await Tenant.findOne({ email: user.email }).populate('room');
    res.json({ user, tenant });
};

module.exports = { register, login, me };
