-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-01-2025 a las 20:49:37
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
  `modelo` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `fecha_registro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  MODIFY `id_coche` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `concesionario`
--
ALTER TABLE `concesionario`
  MODIFY `id_concesionario` int NOT NULL AUTO_INCREMENT;

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
