const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectMySql } = require('./db/mysql');
const { startSockJsStompServer } = require('./ws/stompSockServer');
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'neurofleetx-backend' });
});
const authRoutes = require(path.resolve(__dirname, 'routes', 'auth.js'));
const dashboardRoutes = require(path.resolve(__dirname, 'routes', 'dashboard.js'));
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
try {
  const vehiclesRoutes = require(path.resolve(__dirname, 'routes', 'vehicles.js'));
  app.use('/api', vehiclesRoutes);
} catch (err) {
  console.warn('vehicles.js not found: skipping /api/vehicles route');
}
async function bootstrap() {
  await connectMySql();
  const apiPort = Number(process.env.PORT || 5000);
  app.listen(apiPort, () => {
    console.log(`API listening on http://localhost:${apiPort}`);
  });

  
  const wsPort = Number(process.env.WS_PORT || 8080);
  startSockJsStompServer(wsPort);
}

bootstrap();
