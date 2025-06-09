const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all obat
router.get("/", async (req, res) => {
 try {
  const result = await db.query("SELECT * FROM obat");
  res.json(result.rows);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data obat", error: error.message });
 }
});

// POST add new obat
router.post("/", async (req, res) => {
 const { kodeObat, namaObat, stokObat, hargaObat, kodeKategori, kodeSupplier } =
  req.body;

 if (!kodeObat || !namaObat) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `INSERT INTO obat (kode_obat, nama_obat, stok_obat, harga_obat, kode_kategori, kode_supplier) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_obat`,
   [kodeObat, namaObat, stokObat, hargaObat, kodeKategori, kodeSupplier]
  );
  res
   .status(201)
   .json({ message: "Obat berhasil ditambahkan", id: result.rows[0].id_obat });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menambahkan obat", error: error.message });
 }
});

// PUT update obat by id
router.get("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query("SELECT * FROM obat WHERE id_obat = $1", [id]);
  if (result.rows.length === 0)
   return res.status(404).json({ message: "Obat tidak ditemukan" });
  res.json(result.rows[0]);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data obat", error: error.message });
 }
});

router.put("/:id", async (req, res) => {
 const id = req.params.id;
 const { kodeObat, namaObat, stokObat, hargaObat, kodeKategori, kodeSupplier } =
  req.body;

 if (!kodeObat || !namaObat) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `UPDATE obat SET kode_obat = $1, nama_obat = $2, stok_obat = $3, harga_obat = $4, kode_kategori = $5, kode_supplier = $6
       WHERE id_obat = $7`,
   [kodeObat, namaObat, stokObat, hargaObat, kodeKategori, kodeSupplier, id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Obat tidak ditemukan" });
  }

  res.json({ message: "Obat berhasil diupdate" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengupdate obat", error: error.message });
 }
});

// DELETE obat by id
router.delete("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query("DELETE FROM obat WHERE id_obat = $1", [id]);

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Obat tidak ditemukan" });
  }

  res.json({ message: "Obat berhasil dihapus" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menghapus obat", error: error.message });
 }
});

module.exports = router;
