-- Saran yang dipakai
-- Cascade
CREATE TABLE kategori (
    kode_kategori VARCHAR(10) PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
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

CREATE TABLE obat (
    kode_obat VARCHAR(50) PRIMARY KEY,
    nama_obat VARCHAR(100) NOT NULL,
    stok_obat INTEGER DEFAULT 0,
    harga_obat NUMERIC(12, 2),
    kode_kategori VARCHAR(50) NOT NULL REFERENCES kategori(kode_kategori)
        ON UPDATE CASCADE ON DELETE CASCADE,
    kode_supplier VARCHAR(50) NOT NULL REFERENCES supplier(kode_supplier)
        ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pegawai (
    kode_pegawai VARCHAR(10) PRIMARY KEY,
    nama_pegawai VARCHAR(100) NOT NULL,
    jabatan VARCHAR(50),
    alamat TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pembelian (
    kode_pembelian VARCHAR(20) PRIMARY KEY,
    kode_obat VARCHAR(20) NOT NULL REFERENCES obat(kode_obat)
        ON UPDATE CASCADE ON DELETE CASCADE,
    jumlah INT NOT NULL,
    tanggal DATE NOT NULL,
    kode_pegawai VARCHAR(20) NOT NULL REFERENCES pegawai(kode_pegawai)
        ON UPDATE CASCADE ON DELETE CASCADE,
    kode_supplier VARCHAR(20) NOT NULL REFERENCES supplier(kode_supplier)
        ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pengeluaran (
    kode_keluar VARCHAR(20) PRIMARY KEY,
    kode_obat VARCHAR(20) NOT NULL REFERENCES obat(kode_obat)
        ON UPDATE CASCADE ON DELETE CASCADE,
    jumlah INT NOT NULL,
    tanggal DATE NOT NULL,
    kode_pegawai VARCHAR(20) NOT NULL REFERENCES pegawai(kode_pegawai)
        ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    birthdate DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saran jangan dipakai
-- Normal
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

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
	phone VARCHAR(20),
	birthdate DATE,
	address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);