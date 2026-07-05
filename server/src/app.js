const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const companyRoutes = require('./routes/companyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/companies', companyRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'PlacementPath API is running',
    status: 'success'
  });
});

module.exports = app;






// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGE0MDVhZTk4MjM3MDY1YmIzNzY0YyIsImlhdCI6MTc4MzI1MTA3OCwiZXhwIjoxNzg1ODQzMDc4fQ.fKI8x8BArds-Rdhv7uRGVsWjGgY3v8a5Wx1BO5aC6x8