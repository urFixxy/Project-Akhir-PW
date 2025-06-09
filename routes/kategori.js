const express = require("express");
const router = express.Router();
const db = require("../db");

// Get semua kategori
router.get("/", async (req, res) => {
 try {
  const result = await db.query(
   "SELECT * FROM kategori ORDER BY id_kategori ASC"
  );
  res.json(result.rows);
 } catch (err) {
  res.status(500).json({ error: "Gagal mengambil data" });
 }
});

// Tambah kategori
router.post("/", async (req, res) => {
 const { kodeKategori, namaKategori } = req.body;
 try {
  await db.query(
   "INSERT INTO kategori (kode_kategori, nama_kategori) VALUES ($1, $2)",
   [kodeKategori, namaKategori]
  );
  res.status(200).json({ message: "Kategori berhasil ditambahkan" });
 } catch (err) {
  res.status(500).json({ error: "Gagal menambahkan data" });
 }
});

// Delete kategori
router.delete("/:id", async (req, res) => {
 const { id } = req.params;

 try {
  const deleteResult = await db.query(
   "DELETE FROM kategori WHERE id_kategori = $1 RETURNING *",
   [id]
  );

  if (deleteResult.rowCount === 0) {
   return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  res.json({ message: "Kategori berhasil dihapus" });
 } catch (err) {
  console.error("Gagal delete kategori:", err);
  res.status(500).json({ message: "Terjadi kesalahan server" });
 }
});

// Update kategori
router.get("/:id", async (req, res) => {
 const { id } = req.params;

 try {
  const result = await db.query(
   "SELECT * FROM kategori WHERE id_kategori = $1",
   [id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  res.json(result.rows[0]);
 } catch (err) {
  console.error("Gagal mengambil kategori berdasarkan ID:", err);
  res
   .status(500)
   .json({ message: "Terjadi kesalahan saat mengambil data kategori" });
 }
});

router.put("/:id", async (req, res) => {
 const { id } = req.params;
 const { kodeKategori, namaKategori } = req.body;

 try {
  const updateResult = await db.query(
   "UPDATE kategori SET kode_kategori = $1, nama_kategori = $2 WHERE id_kategori = $3 RETURNING *",
   [kodeKategori, namaKategori, id]
  );

  if (updateResult.rowCount === 0) {
   return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  res.json({
   message: "Kategori berhasil diupdate",
   kategori: updateResult.rows[0],
  });
 } catch (err) {
  console.error("Gagal update kategori:", err);
  res
   .status(500)
   .json({ error: "Terjadi kesalahan server saat update kategori" });
 }
});

module.exports = router;
