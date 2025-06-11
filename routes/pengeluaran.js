const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all pengeluaran
router.get("/", async (req, res) => {
 try {
  const result = await db.query("SELECT * FROM pengeluaran ORDER BY kode_keluar");
  res.json(result.rows);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data pengeluaran", error: error.message });
 }
});

// POST add new pengeluaran
router.post("/", async (req, res) => {
 const {
  kodeKeluar,
  kodeObat,
  jumlah,
  tanggal,
  kodePegawai,
 } = req.body;

 if (!kodeKeluar) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `INSERT INTO pengeluaran (kode_keluar, kode_obat, jumlah, tanggal, kode_pegawai) 
       VALUES ($1, $2, $3, $4, $5) RETURNING kode_keluar`,
   [
    kodeKeluar,
    kodeObat,
    jumlah,
    tanggal,
    kodePegawai,
   ]
  );
  res.status(201).json({
   message: "Pengeluaran berhasil ditambahkan",
   id: result.rows[0].kode_keluar,
  });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menambahkan Pengeluaran", error: error.message });
 }
});

// PUT update pengeluaran by id
router.put("/:id", async (req, res) => {
 const id = req.params.id;
 const {
  kodeKeluar,
  kodeObat,
  jumlah,
  tanggal,
  kodePegawai,
 } = req.body;

 if (!kodeKeluar) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `UPDATE pengeluaran SET 
                kode_keluar = $1,
                kode_obat = $2,
                jumlah = $3,
                tanggal = $4,
                kode_pegawai = $5
             WHERE kode_keluar = $6`,
   [
    kodeKeluar,
    kodeObat,
    jumlah,
    tanggal,
    kodePegawai,
    id,
   ]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Pengeluaran tidak ditemukan" });
  }

  res.json({ message: "Pengeluaran berhasil diupdate" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengupdate Pengeluaran", error: error.message });
 }
});

router.get("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query(
   "SELECT * FROM pengeluaran WHERE kode_keluar = $1",
   [id]
  );
  if (result.rows.length === 0)
   return res.status(404).json({ message: "Pengeluaran tidak ditemukan" });
  res.json(result.rows[0]);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data pengeluaran", error: error.message });
 }
});

// DELETE pembelian by id
router.delete("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query(
   "DELETE FROM pengeluaran WHERE kode_keluar = $1",
   [id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Pengeluaran tidak ditemukan" });
  }

  res.json({ message: "Pengeluaran berhasil dihapus" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menghapus Pengeluaran", error: error.message });
 }
});

module.exports = router;
