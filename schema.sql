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

INSERT INTO products (id, title, price, image_url) 
VALUES
    (11, 'Modern Mesh Office Visitor Chairs', 8500.00, 'products/product11.png'),
    (12, 'Ergonomic High-Back Executive Mesh Chair', 14500.00, 'products/product12.png'),
    (13, 'Primary & Secondary School Desks & Chairs Set', 4500.00, 'products/product13.png'),
    (14, 'University Writing Tablet Arm Chair', 3800.00, 'products/product14.png'),
    (15, 'Heavy Duty Metal Double Bunk Bed Frame', 24000.00, 'products/product15.png');

-- show all the data in products table
SELECT * 
FROM products;

-- show all the data in users table
SELECT * 
FROM users;
