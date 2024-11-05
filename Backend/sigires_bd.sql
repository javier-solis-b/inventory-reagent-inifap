CREATE DATABASE sigires_bd;

use sigires_bd

--TABLA DE USUARIOS
CREATE TABLE users(
    id VARCHAR(36) PRIMARY KEY,
    name TEXT,
    password TEXT,
    UNIQUE KEY (name(255))
)

ALTER TABLE users ADD COLUMN isAdmin INTEGER DEFAULT 0;

--TABLA DE ALMACEN
CREATE TABLE Almacen (
    Id INT PRIMARY KEY,
    Nombre_Almacen VARCHAR(255)
);

--TABLA DE REACTIVOS
CREATE TABLE Cat_Reactivos (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Marca VARCHAR(255),
    Formula VARCHAR(255),
    Contenido VARCHAR(255),
    PM FLOAT(255),

);

--TABLA INVENTARIO
CREATE TABLE Inventario (
    Id INT PRIMARY KEY,
    Fecha DATE,
    Contenido VARCHAR(255)
);

--TABLA DE SOLUCIONES
CREATE TABLE Cat_Soluciones (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Contenido VARCHAR(255)
);

--TABLA DE ALMACENES
CREATE TABLE Detalle_Almacenes (
    Id INT PRIMARY KEY,
    Nombre_A VARCHAR(255),
    Hora TIME
);


--DETALLE DE PAQUETES
CREATE TABLE Detalle_Paquetes (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Contenido VARCHAR(255)
);


-- Relaciones
ALTER TABLE Detalle_Almacenes
ADD CONSTRAINT FK_Almacen FOREIGN KEY (Id) REFERENCES Almacen(Id);

ALTER TABLE Inventario
ADD CONSTRAINT FK_Cat_Reactivos FOREIGN KEY (Id) REFERENCES Cat_Reactivos(Id);

ALTER TABLE Detalle_Paquetes
ADD CONSTRAINT FK_Cat_Soluciones FOREIGN KEY (Id) REFERENCES Cat_Soluciones(Id);


