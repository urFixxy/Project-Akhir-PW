const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const kategoriRoutes = require('./routes/kategori');
const obatRoutes = require('./routes/obat');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/kategori', kategoriRoutes);

app.use('/api/obat', obatRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});