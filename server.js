const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'joymax_db',
  password: 'iloveGOD55,', 
  port: 5433,
});

// Test Connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database Connection Error:', err.message);
  } else {
    console.log('Connected to PostgreSQL database: joymax_db');
  }
});

// Prevent Node from crashing quietly
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcryptjs.compare(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, full_name: user.full_name, email: user.email }
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// Start Server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});