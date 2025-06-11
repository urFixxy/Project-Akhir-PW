const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const signinRoutes = require('./routes/signin');
const signoutRoutes = require('./routes/signout'); // <-- Pastikan diimport
const kategoriRoutes = require('./routes/kategori');
const obatRoutes = require('./routes/obat');
const pegawaiRoutes = require('./routes/pegawai');
const supplierRoutes = require('./routes/supplier');
const pembelianRoutes = require('./routes/pembelian');
const pengeluaranRoutes = require('./routes/pengeluaran');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = 3000;

// Harus sebelum routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'rahasia_kamu',
  resave: false,
  saveUninitialized: false, // <-- Lebih baik false agar session hanya dibuat jika dibutuhkan
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 jam
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/signin', signinRoutes);
app.use('/api/signout', signoutRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/obat', obatRoutes);
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/pembelian', pembelianRoutes);
app.use('/api/pengeluaran', pengeluaranRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ login: true, user: req.session.user });
  } else {
    res.status(401).json({ login: false, message: 'Belum login' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
