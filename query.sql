CREATE TABLE kategori (
    id_kategori SERIAL PRIMARY KEY,
    kode_kategori VARCHAR(10) NOT NULL UNIQUE,
    nama_kategori VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO kategori (kode_kategori, nama_kategori) VALUES
('KTG0011', 'Antibiotik'),
('KTG0012', 'Vitamin'),
('KTG0013', 'Analgesik');