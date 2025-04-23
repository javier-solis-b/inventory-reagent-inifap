-- usar la base de datos
use bj4ymt1bxmqkjn0antfx;
-- -------------------------------------------------------------------------
-- Creacion de tablas
-- -------------------------------------------------------------------------
-- crear tabla usuarios ----------------------------------------------------
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` text,
  `password` text,
  `isAdmin` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from users;

-- creacion de tabla catalogos (almacenes) --------------------------------
CREATE TABLE `catalogos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_almacen` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from catalogos

-- creacion de tabla recursos ------------------------------------------
CREATE TABLE `recursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo_recurso` varchar(255) NOT NULL,
  `no_inventario` varchar(255) NOT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `pm` varchar(255) DEFAULT NULL,
  `formula` varchar(255) DEFAULT NULL,
  `capacidad_r` double DEFAULT NULL,
  `lote` varchar(255) DEFAULT NULL,
  `recipientes_actuales` float DEFAULT NULL,
  `catalogo_id` int DEFAULT NULL,
  `unidad_medida` varchar(50) DEFAULT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `catalogo_id` (`catalogo_id`),
  CONSTRAINT `recursos_ibfk_1` FOREIGN KEY (`catalogo_id`) REFERENCES `catalogos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from recursos;

-- creacion de la tabla soluciones stocks
CREATE TABLE `SolucionesStocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `medios_cultivo` varchar(255) DEFAULT NULL,
  `nombre_solucion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
select * from SolucionesStocks;


-- creacion tabla soluciones recurso ---------------------------------------------------
CREATE TABLE `SolucionesRecursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `solucion_id` int DEFAULT NULL,
  `recurso_id` int DEFAULT NULL,
  `cantidad_usada` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solucion_id` (`solucion_id`),
  KEY `recurso_id` (`recurso_id`),
  CONSTRAINT `solucionesrecursos_ibfk_1` FOREIGN KEY (`solucion_id`) REFERENCES `SolucionesStocks` (`id`),
  CONSTRAINT `solucionesrecursos_ibfk_2` FOREIGN KEY (`recurso_id`) REFERENCES `recursos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from SolucionesRecursos;


-- Procedimientos------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------
-- Procedimiento para crear soluciones
DELIMITER //

CREATE PROCEDURE insertar_solucion_stock(
    IN p_nombre_solucion VARCHAR(255),
    IN p_recursos JSON
)
BEGIN
    DECLARE solucion_id INT;
    DECLARE recurso_id INT;
    DECLARE cantidad_usada DECIMAL(10, 2);
    DECLARE done INT DEFAULT 0;

    DECLARE recursos_cursor CURSOR FOR 
        SELECT * FROM JSON_TABLE(p_recursos, '$[*]' 
        COLUMNS (
            recurso_id INT PATH '$.recurso_id', 
            cantidad_usada DECIMAL(10, 2) PATH '$.cantidad_usada'
        )
    ) AS recursos_alias;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Insertar en SolucionesStock
    INSERT INTO SolucionesStocks (nombre_solucion) 
    VALUES (p_nombre_solucion);

    -- Obtener el id de la nueva solución
    SET solucion_id = LAST_INSERT_ID();

    -- Manejar cada recurso en JSON
    OPEN recursos_cursor;
    leer_recursos: LOOP
        FETCH recursos_cursor INTO recurso_id, cantidad_usada;
        IF done THEN
            LEAVE leer_recursos;
        END IF;

        -- Insertar en SolucionRecursos
        INSERT INTO SolucionesRecursos (solucion_id, recurso_id, cantidad_usada) 
        VALUES (solucion_id, recurso_id, cantidad_usada);
    END LOOP leer_recursos;

    CLOSE recursos_cursor;
END //

DELIMITER ;
-- ----------------------------------------------------------------------------------------------
-- Procedimiento para actualizar inventario (modificado)
DELIMITER //

CREATE PROCEDURE actualizar_inventario(
    IN p_solucion_id INT
)
BEGIN
    DECLARE recurso_id INT;
    DECLARE cantidad_usada DECIMAL(10, 2);
    DECLARE done INT DEFAULT 0;

    -- Cursor para obtener recursos y cantidades de la solución específica
    DECLARE recursos_cursor CURSOR FOR 
        SELECT r.id, sr.cantidad_usada 
        FROM recursos r
        JOIN SolucionesRecursos sr ON r.id = sr.recurso_id
        WHERE sr.solucion_id = p_solucion_id;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Actualizar inventario
    OPEN recursos_cursor;
    actualizar_recursos: LOOP
        FETCH recursos_cursor INTO recurso_id, cantidad_usada;
        IF done THEN
            LEAVE actualizar_recursos;
        END IF;

        UPDATE recursos 
        SET capacidad_r = capacidad_r - cantidad_usada
        WHERE id = recurso_id;
    END LOOP actualizar_recursos;

    CLOSE recursos_cursor;
END //

DELIMITER ;

-- Llamar al procedimiento almacenado para crear una solución de prueba
CALL insertar_solucion_stock(
    'Solucion prueba11',
    JSON_ARRAY(
        JSON_OBJECT('recurso_id', (SELECT id FROM Recursos WHERE nombre = 'Reactivo A'), 'cantidad_usada', 10),
        JSON_OBJECT('recurso_id', (SELECT id FROM Recursos WHERE nombre = 'Reactivo B'), 'cantidad_usada', 10),
        JSON_OBJECT('recurso_id', (SELECT id FROM Recursos WHERE nombre = 'Reactivo C'), 'cantidad_usada', 10)
    )
);

-- Llamar al procedimiento almacenado para actualizar el inventario
CALL actualizar_inventario((SELECT id FROM SolucionesStock WHERE nombre_solucion = 'Solucion prueba11'));
SELECT * FROM SolucionesStocks WHERE nombre_solucion = 'Solucion pruebas';
select * from solucionrecursos;







-- ----------- no ejecutar a menos que se requiera
drop procedure insertar_solucion_stock;
drop procedure actualizar_inventario;