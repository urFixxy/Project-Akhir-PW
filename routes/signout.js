const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Gagal logout' });
    }
    res.json({ message: 'Berhasil logout' });
  });
});

module.exports = router;
