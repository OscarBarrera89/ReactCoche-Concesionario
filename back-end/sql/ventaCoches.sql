-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 05-02-2025 a las 16:06:30
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ventaCoches`
--
CREATE DATABASE ventaCoches;

USE ventaCoches;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coche`
--

CREATE TABLE `coche` (
  `id_coche` int NOT NULL,
  `id_concesionario` int NOT NULL,
  `matricula` varchar(15) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `fecha_registro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `coche`
--

INSERT INTO coche (id_coche, id_concesionario, matricula, modelo, precio, disponible, fecha_registro) VALUES
(1, 10, 'ABC1234', 'Toyota Corolla', 18000.00, 1, '2024-02-01'),
(2, 9, 'XYZ5678', 'Honda Civic', 22000.00, 0, '2024-02-02'),
(3, 7, 'LMN9101', 'Ford Focus', 19500.00, 1, '2024-02-03'),
(4, 4, 'JKL2345', 'BMW 320i', 35000.00, 0, '2024-02-04'),
(5, 6, 'QRS6789', 'Audi A3', 33000.00, 1, '2024-02-05'),
(6, 2, 'TUV3456', 'Mercedes-Benz C200', 40000.00, 1, '2024-02-06'),
(7, 1, 'DEF9012', 'Volkswagen Golf', 21000.00, 1, '2024-02-07'),
(8, 3, 'GHI7890', 'Mazda 3', 20000.00, 1, '2024-02-08'),
(9, 8, 'VWX4567', 'Tesla Model 3', 45000.00, 0, '2024-02-09'),
(10, 11, 'YZA3210', 'Hyundai Tucson', 27000.00, 1, '2024-02-10'),
(11, 5, 'BCD6543', 'Kia Sportage', 26000.00, 0, '2024-02-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concesionario`
--

CREATE TABLE `concesionario` (
  `id_concesionario` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `fecha_fundacion` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `concesionario`
--

INSERT INTO concesionario (id_concesionario, nombre, direccion, fecha_fundacion, activo) VALUES
(1, 'AutoLux', 'Calle Principal 123, Madrid', '2005-06-15', 1),
(2, 'SuperCars', 'Avenida del Motor 45, Barcelona', '2010-09-20', 1),
(3, 'Speedy Auto', 'Carrera 8 #23-45, Valencia', '2000-03-10', 1),
(4, 'Elite Motors', 'Plaza Central 67, Sevilla', '2015-11-05', 0),
(5, 'DreamCars', 'Calle del Sueño 89, Málaga', '2018-07-12', 1),
(6, 'CarNation', 'Autopista Norte KM 15, Bilbao', '2002-04-30', 1),
(7, 'Prestige Autos', 'Avenida Real 78, Zaragoza', '1999-01-25', 0),
(8, 'CityDrive', 'Centro Comercial Autos 22, Valencia', '2012-10-17', 0),
(9, 'Luxury Wheels', 'Paseo de la Riqueza 101, Madrid', '2020-05-20', 1),
(10, 'EcoCars', 'Zona Verde 12, Barcelona', '2016-08-08', 1),
(11, 'Urban Motors', 'Calle Urbana 33, Sevilla', '2019-12-03', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `coche`
--
ALTER TABLE `coche`
  ADD PRIMARY KEY (`id_coche`),
  ADD KEY `id_concesionario` (`id_concesionario`);

--
-- Indices de la tabla `concesionario`
--
ALTER TABLE `concesionario`
  ADD PRIMARY KEY (`id_concesionario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `coche`
--
ALTER TABLE `coche`
  MODIFY `id_coche` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `concesionario`
--
ALTER TABLE `concesionario`
  MODIFY `id_concesionario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coche`
--
ALTER TABLE `coche`
  ADD CONSTRAINT `coche_ibfk_1` FOREIGN KEY (`id_concesionario`) REFERENCES `concesionario` (`id_concesionario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
