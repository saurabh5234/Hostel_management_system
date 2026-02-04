require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Room = require('../models/Room');
const Tenant = require('../models/Tenant');
const Payment = require('../models/Payment');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_management';

const seed = async () => {
  await connectDB(MONGO_URI);

  
  await User.deleteMany({});
  await Room.deleteMany({});
  await Tenant.deleteMany({});
  await Payment.deleteMany({});

  
  const pw = await bcrypt.hash('admin123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', passwordHash: pw, role: 'admin' });

  
  const roomsData = [];
  for (let i = 1; i <= 10; i++) {
    roomsData.push({
      number: `R-${100 + i}`,
      type: i % 2 === 0 ? 'double' : 'single',
      floor: Math.ceil(i / 4),
      monthlyRent: i % 2 === 0 ? 8000 : 5000,
      securityDeposit: i % 2 === 0 ? 16000 : 10000,
      status: 'vacant',
      amenities: { wifi: true, ac: i % 3 === 0, tv: true, parking: false, food: false }
    });
  }
  const rooms = await Room.insertMany(roomsData);

  
  const tenant = await Tenant.create({
    fullName: 'Amit Kumar',
    email: 'amit@example.com',
    phone: '9876543210',
    room: rooms[0]._id,
    checkInDate: new Date(),
    monthlyRent: rooms[0].monthlyRent,
    securityDeposit: rooms[0].securityDeposit
  });

  await Room.findByIdAndUpdate(rooms[0]._id, { tenant: tenant._id, status: 'occupied' });

  console.log('Seed complete. Admin credentials: admin@example.com / admin123');
  mongoose.connection.close();
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
