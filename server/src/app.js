const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'PlacementPath API is running',
    status: 'success'
  });
});

module.exports = app;