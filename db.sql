---in DB Shell---

---Create Database---
CREATE DATABASE yaka_store;


---Create User Table---
CREATE TABLE users (
    usr_id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    confirmPassword TEXT NOT NULL,
    isAdmin boolean DEFAULT false,
    token TEXT, 
    CONSTRAINT email_unique UNIQUE(email)
    );

---Create Department Table---
CREATE TABLE dept(
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(255)
);

---Create Category Table---
CREATE TABLE category(
    cat_id SERIAL PRIMARY KEY,
    cat_name VARCHAR(255),
    dept_id BIGINT,
    CONSTRAINT fk_dept_cat_id 
    FOREIGN KEY (dept_id)
    REFERENCES dept(dept_id)
);

---Create Model Table---
CREATE TABLE brand(
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255),
    cat_id BIGINT,
    CONSTRAINT fk_cat_brand_id
    FOREIGN KEY (cat_id)
    REFERENCES category(cat_id)
);

---Create Product Table---
CREATE TABLE product(
    prod_id SERIAL PRIMARY KEY,
    prod_name VARCHAR(255) NOT NULL,
    image VARCHAR,
    rate BIGINT,
    price BIGINT NOT NULL,
    color VARCHAR(255),
    wieght VARCHAR(255),
    matrial VARCHAR(255),
    creationDate DATE,
    other VARCHAR(255),
    brand_id BIGINT NOT NULL,
    CONSTRAINT fk_brand_product_id 
    FOREIGN KEY (brand_id)
    REFERENCES brand(brand_id) ON DELETE CASCADE
);



