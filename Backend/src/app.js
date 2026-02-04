const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const expenseRoutes = require("./routes/expenses");

const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const tenantRoutes = require('./routes/tenants');
const paymentRoutes = require('./routes/payments');
const studentRoutes = require('./routes/student.routes');
const maintenanceRoutes = require("./routes/maintenance");
const reportRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/payments', paymentRoutes)
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/reports", reportRoutes);
// student routes
app.use('/api/student', studentRoutes);
app.use("/api/expenses", expenseRoutes); 
app.use("/api/settings", require("./routes/settings"));


app.get('/', (req, res) => res.json({ message: 'Hostel Management API'}));

//error handler
app.use(errorHandler);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

module.exports = app;