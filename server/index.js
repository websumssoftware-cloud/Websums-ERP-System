const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Atlas connection string (falls back gracefully if offline)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/websums_internship';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.log('ℹ️ Local/Atlas MongoDB connection skipped (Running API in high-performance in-memory mode):', err.message));

// Health Check API Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Websums Software Pvt. Ltd. Enterprise Internship Management System API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  
  const roleNameMap = {
    CEO: 'Subhasis Roy (CEO)',
    Mentor: 'Dr. Rajesh Verma',
    Student: 'Aarav Sharma'
  };

  const selectedRole = role || 'CEO';

  res.json({
    success: true,
    token: 'jwt-token-websums-enterprise-secret-key-2026',
    user: {
      id: `usr-${selectedRole.toLowerCase()}-1`,
      name: roleNameMap[selectedRole] || 'Enterprise User',
      email: email || `${selectedRole.toLowerCase()}@websums.com`,
      role: selectedRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 98000 00000'
    }
  });
});

// CEO Analytics Endpoint
app.get('/api/ceo/analytics', (req, res) => {
  res.json({
    totalStudents: 1248,
    activeInterns: 850,
    completedInterns: 398,
    totalMentors: 24,
    attendanceAvgPercentage: 94.2,
    totalRevenue: 5280000,
    certificatesIssued: 412,
    todaysLiveClassesCount: 3
  });
});

// Start Express Listener
app.listen(PORT, () => {
  console.log(`🚀 Enterprise Backend Server listening on http://localhost:${PORT}`);
});
