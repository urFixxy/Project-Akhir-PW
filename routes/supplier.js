const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all supplier
router.get("/", async (req, res) => {
 try {
  const result = await db.query("SELECT * FROM supplier");
  res.json(result.rows);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data supplier", error: error.message });
 }
});

// POST add new pegawai
router.post("/", async (req, res) => {
 const { kodeSupplier, namaSupplier, alamatSupplier } = req.body;

 if (!kodeSupplier || !namaSupplier) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `INSERT INTO supplier (kode_supplier, nama_supplier, alamat) 
       VALUES ($1, $2, $3) RETURNING kode_supplier`,
   [kodeSupplier, namaSupplier, alamatSupplier]
  );
  res
   .status(201)
   .json({ message: "Supplier berhasil ditambahkan", id: result.rows[0].kode_supplier });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menambahkan supplier", error: error.message });
 }
});

// PUT update obat by id
router.put("/:id", async (req, res) => {
 const id = req.params.id;
 const { kodeSupplier, namaSupplier, alamatSupplier } = req.body;

 if (!kodeSupplier || !namaSupplier) {
  return res.status(400).json({ message: "Data tidak lengkap" });
 }

 try {
  const result = await db.query(
   `UPDATE supplier SET kode_supplier = $1, nama_supplier = $2, alamat = $3 WHERE kode_supplier = $4`,
   [kodeSupplier, namaSupplier, alamatSupplier, id]
  );

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Supplier tidak ditemukan" });
  }

  res.json({ message: "Supplier berhasil diupdate" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengupdate supplier", error: error.message });
 }
});

router.get("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query("SELECT * FROM supplier WHERE kode_supplier = $1", [id]);
  if (result.rows.length === 0)
   return res.status(404).json({ message: "Supplier tidak ditemukan" });
  res.json(result.rows[0]);
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error mengambil data supplier", error: error.message });
 }
});

// DELETE obat by id
router.delete("/:id", async (req, res) => {
 const id = req.params.id;
 try {
  const result = await db.query("DELETE FROM supplier WHERE kode_supplier = $1", [id]);

  if (result.rowCount === 0) {
   return res.status(404).json({ message: "Supplier tidak ditemukan" });
  }

  res.json({ message: "Supplier berhasil dihapus" });
 } catch (error) {
  res
   .status(500)
   .json({ message: "Error menghapus supplier", error: error.message });
 }
});

module.exports = router;
