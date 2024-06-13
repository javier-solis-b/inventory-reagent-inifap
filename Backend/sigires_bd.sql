CREATE DATABASE sigires_bd;
use sigires_bd

CREATE TABLE users(
    id VARCHAR(36) PRIMARY KEY,
    name TEXT,
    password TEXT,
    UNIQUE KEY (name(255))
)

INSERT INTO users (id, name, password) VALUES(UUID(), 'admin', 'admin')