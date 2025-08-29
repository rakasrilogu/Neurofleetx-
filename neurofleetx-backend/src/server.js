const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// MySQL pool + admin seeding
const { connectMySql } = require('./db/mysql');

// SockJS + minimal STOMP broadcaster on /ws (separate port)
const { startSockJsStompServer } = require('./ws/stompSockServer');

const app = express();

// Enable CORS for CRA dev server
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));

// Body parser
app.use(express.json());

// Logger
app.use(morgan('dev'));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'neurofleetx-backend' });
});

// Routes (use absolute paths to avoid MODULE_NOT_FOUND due to cwd/casing)
const authRoutes = require(path.resolve(__dirname, 'routes', 'auth.js'));
const dashboardRoutes = require(path.resolve(__dirname, 'routes', 'dashboard.js'));

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);

// Vehicles route is optional; load if present to avoid startup crash
try {
  const vehiclesRoutes = require(path.resolve(__dirname, 'routes', 'vehicles.js'));
  app.use('/api', vehiclesRoutes);
} catch (err) {
  console.warn('vehicles.js not found: skipping /api/vehicles route');
}

// Bootstrap servers
async function bootstrap() {
  // Initialize DB first
  await connectMySql();

  // Start HTTP API
  const apiPort = Number(process.env.PORT || 5000);
  app.listen(apiPort, () => {
    console.log(`API listening on http://localhost:${apiPort}`);
  });

  // Start SockJS/STOMP
  const wsPort = Number(process.env.WS_PORT || 8080);
  startSockJsStompServer(wsPort);
}

bootstrap();
