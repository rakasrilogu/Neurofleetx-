const express = require('express');
const { auth } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/vehicles', auth, (_req, res) => {
  res.json({
    vehicles: [
      { id: 1, licensePlate: 'KA-01-AB-1234', location: '37.7749,-122.4194', status: 'active', mileage: 5300, fuelLevel: 65 },
      { id: 2, licensePlate: 'MH-12-XY-4321', location: '37.7849,-122.4094', status: 'idle', mileage: 8100, fuelLevel: 48 },
      { id: 3, licensePlate: 'DL-05-CQ-7777', location: '37.7649,-122.4294', status: 'active', mileage: 2500, fuelLevel: 72 }
    ]
  });
});

module.exports = router;
