// neurofleetx-backend/src/routes/dashboard.js
const express = require('express');
const { auth } = require('../utils/authMiddleware');

const router = express.Router();

// GET /api/dashboard (protected)
router.get('/dashboard', auth, (_req, res) => {
  res.json({
    vehicles: 24,
    activeTrips: 6,
    alerts: 2,
    lastUpdated: new Date().toISOString(),
  });
});

module.exports = router;
