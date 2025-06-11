CREATE TABLE kategori (
    kode_kategori VARCHAR(10) PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE obat (
    kode_obat VARCHAR(50) PRIMARY KEY,
    nama_obat VARCHAR(100) NOT NULL,
    stok_obat INTEGER DEFAULT 0,
    harga_obat NUMERIC(12, 2),
    kode_kategori VARCHAR(50) NOT NULL REFERENCES kategori(kode_kategori),
    kode_supplier VARCHAR(50) NOT NULL REFERENCES supplier(kode_supplier),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supplier (
    kode_supplier VARCHAR(10) PRIMARY KEY,
    nama_supplier VARCHAR(100) NOT NULL,
    alamat TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pembelian (
    kode_pembelian VARCHAR(20) PRIMARY KEY,
    kode_obat VARCHAR(20) NOT NULL REFERENCES obat(kode_obat),
    kode_kategori VARCHAR(20) NOT NULL REFERENCES kategori(kode_kategori),
    jumlah INT NOT NULL,
    tanggal DATE NOT NULL,
    kode_pegawai VARCHAR(20) NOT NULL REFERENCES pegawai(kode_pegawai),
    kode_supplier VARCHAR(20) NOT NULL REFERENCES supplier(kode_supplier),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pengeluaran (
    kode_keluar VARCHAR(20) PRIMARY KEY,
    kode_obat VARCHAR(20) NOT NULL REFERENCES obat(kode_obat),
    jumlah INT NOT NULL,
    tanggal DATE NOT NULL,
    kode_pegawai VARCHAR(20) NOT NULL REFERENCES pegawai(kode_pegawai),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

