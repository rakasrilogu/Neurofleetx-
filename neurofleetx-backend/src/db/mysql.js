const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

let pool;

async function connectMySql() {
  pool = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'neurofleetx',
    connectionLimit: 10,
    waitForConnections: true
  });

  await initSchema();
  await ensureAdmin();
  console.log('MySQL connected and ready');
}

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

async function ensureAdmin() {
  const [rows] = await pool.query('SELECT id FROM users WHERE email=?', ['admin@gmail.com']);
  if (rows.length) return;
  const hash = await bcrypt.hash('admin', 10);
  await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?,?,?)',
    ['Admin', 'admin@gmail.com', hash]
  );
  console.log('Seeded default admin user (admin@gmail.com / admin)');
}

function getPool() {
  if (!pool) throw new Error('MySQL pool not initialized');
  return pool;
}

module.exports = { connectMySql, getPool };
