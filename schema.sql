-- Create the Database 
CREATE DATABASE joymax_db;

--  Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100),
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table 
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert data in products table
INSERT INTO products (title, price, image_url)
VALUES 
    ('Modern Study Desks & Folding Chairs Set', 25000.00, 'products/product1.png'),
    ('Student Writing Arm Chairs with Book Rack', 3500.00, 'products/product2.png'),
    ('Colorful Plastic Stackable Kids Chairs', 1200.00, 'products/product3.png'),
    ('Modern Wooden Living Room Sofa Set', 45000.00, 'products/product4.png'),
    ('Chevron Metal Platform Bed Frame', 18000.00, 'products/product5.png'),
    ('Heavy Duty Metal Double Bunk Bed', 22000.00, 'products/product6.png'),
    ('Industrial Study Desk with Bookshelf', 18500.00, 'products/product7.png'),
    ('Commercial Red Bar Stools (Set of 6)', 24000.00, 'products/product8.png'),
    ('High-Top Red Cushioned Bar Stools', 28000.00, 'products/product9.png'),
    ('Ergonomic Executive Mesh Office Chair', 12500.00, 'products/product10.png');

-- delet all data in products table
TRUNCATE TABLE products RESTART IDENTITY;

-- show all the data in products table
SELECT * 
FROM products;

-- show all the data in users table
SELECT * 
FROM users;
