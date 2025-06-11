const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all pembelian
router.get("/", async (req, res) => {
 try {
  const result = await db.query("SELECT * FROM pembelian ORDER BY kode_pembelian");
  res.json(result.rows);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data pembelian", error: error.message });
 }
});

// POST add new pembelian
router.post("/", async (req, res) => {
 const {
  kodePembelian,
  kodeObat,
  jumlah,
  tanggal,
  kodePegawai,
  kodeSupplier,
 } = req.body;

 if (!kodePembelian) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `INSERT INTO pembelian (kode_pembelian, kode_obat, jumlah, tanggal, kode_pegawai, kode_supplier) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING kode_pembelian`,
   [
    kodePembelian,
    kodeObat,
    jumlah,
    tanggal,
    kodePegawai,
    kodeSupplier,
   ]
  );
  res.status(201).json({
   message: "Pembelian berhasil ditambahkan",
   id: result.rows[0].kode_pembelian,
  });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menambahkan pembelian", error: error.message });
 }
});

// PUT update obat by id
router.put("/:id", async (req, res) => {
 const id = req.params.id;
 const {
  kodePembelian,
  kodeObat,
  jumlah,
  tanggal,
  kodePegawai,
  kodeSupplier,
 } = req.body;

 if (!kodePembelian) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `UPDATE pembelian SET 
                kode_pembelian = $1,
                kode_obat = $2,
                jumlah = $3,
                tanggal = $4,
                kode_pegawai = $5,
                kode_supplier = $6
             WHERE kode_pembelian = $7`,
   [
    kodePembelian,
    kodeObat,
    jumlah,
    tanggal,
    kodePegawai,
    kodeSupplier,
    id,
   ]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Pembelian tidak ditemukan" });
  }

  res.json({ message: "Pembelian berhasil diupdate" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengupdate Pembelian", error: error.message });
 }
});

// DELETE pembelian by id
router.delete("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query(
   "DELETE FROM pembelian WHERE kode_pembelian = $1",
   [id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Pembelian tidak ditemukan" });
  }

  res.json({ message: "Pembelian berhasil dihapus" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menghapus Pembelian", error: error.message });
 }
});

router.get("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query(
   "SELECT * FROM pembelian WHERE kode_pembelian = $1",
   [id]
  );
  if (result.rows.length === 0)
   return res.status(404).json({ message: "pembelian tidak ditemukan" });
  res.json(result.rows[0]);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data pembelian", error: error.message });
 }
});

module.exports = router;
