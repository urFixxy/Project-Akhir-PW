const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all pegawai
router.get("/", async (req, res) => {
 try {
  const result = await db.query("SELECT * FROM pegawai ORDER BY kode_pegawai");
  res.json(result.rows);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data pegawai", error: error.message });
 }
});

// POST add new pegawai
router.post("/", async (req, res) => {
 const { kodePegawai, namaPegawai, jabatan, alamat } = req.body;

 if (!kodePegawai || !namaPegawai) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `INSERT INTO pegawai (kode_pegawai, nama_pegawai, jabatan, alamat) 
       VALUES ($1, $2, $3, $4) RETURNING kode_pegawai`,
   [kodePegawai, namaPegawai, jabatan, alamat]
  );
  res
   .status(201)
   .json({ message: "Pegawai berhasil ditambahkan", id: result.rows[0].id_pegawai });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menambahkan pegawai", error: error.message });
 }
});

// PUT update obat by id
router.get("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query("SELECT * FROM pegawai WHERE kode_pegawai = $1", [id]);
  if (result.rows.length === 0)
   return res.status(404).json({ message: "Pegawai tidak ditemukan" });
  res.json(result.rows[0]);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data obat", error: error.message });
 }
});

router.put("/:id", async (req, res) => {
 const id = req.params.id;
 const { kodePegawai, namaPegawai, jabatan, alamat } =
  req.body;

 if (!kodePegawai || !namaPegawai) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `UPDATE pegawai SET kode_pegawai = $1, nama_pegawai = $2, jabatan = $3, alamat = $4 WHERE kode_pegawai = $5`,
   [kodePegawai, namaPegawai, jabatan, alamat, id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Pegawai tidak ditemukan" });
  }

  res.json({ message: "Pegawai berhasil diupdate" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengupdate pegawai", error: error.message });
 }
});

// DELETE obat by id
router.delete("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query("DELETE FROM pegawai WHERE kode_pegawai = $1", [id]);

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Pegawai tidak ditemukan" });
  }

  res.json({ message: "Pegawai berhasil dihapus" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menghapus pegawai", error: error.message });
 }
});

module.exports = router;
