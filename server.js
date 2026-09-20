const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static assets and images from the project folder & products folder
app.use(express.static(path.join(__dirname)));
app.use('/products', express.static(path.join(__dirname, 'products')));

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

// Authentication Routes
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

// Product API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Fetch Products Error:', err.message);
    res.status(500).json({ message: 'Server error fetching products.' });
  }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Fetch Product Error:', err.message);
    res.status(500).json({ message: 'Server error fetching product.' });
  }
});

// Start Server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});