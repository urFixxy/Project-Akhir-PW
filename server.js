const express = require('express');
const path = require('path');
const cors = require('cors');
const kategoriRoutes = require('./routes/kategori');
const obatRoutes = require('./routes/obat');
const pegawaiRoutes = require('./routes/pegawai');
const supplierRoutes = require('./routes/supplier');
const pembelianRoutes = require('./routes/pembelian');
const pengeluaranRoutes = require('./routes/pengeluaran');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/kategori', kategoriRoutes);
app.use('/api/obat', obatRoutes);
app.use('/api/pegawai', pegawaiRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/pembelian', pembelianRoutes);
app.use('/api/pengeluaran', pengeluaranRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});