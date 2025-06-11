const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET: Ambil profil berdasarkan email
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      'SELECT email, phone, address, birthdate FROM admin WHERE email = $1',
      [email]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT: Update profil berdasarkan email
router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { phone, address, birthdate } = req.body;

  try {
    const result = await pool.query(
      `UPDATE admin 
       SET phone = $1, address = $2, birthdate = $3 
       WHERE email = $4 
       RETURNING email, phone, address, birthdate`,
      [phone, address, birthdate, email]
    );

    if (result.rows.length > 0) {
      res.json({ message: 'Profile updated successfully', data: result.rows[0] });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
