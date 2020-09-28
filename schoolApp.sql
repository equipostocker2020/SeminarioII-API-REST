-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2020 a las 01:07:12
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `schoolApp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `determinado` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `cuit_cuil` varchar(15) NOT NULL,
  `rol` varchar(10) NOT NULL,
  `fecha_nac` date NOT NULL,
  `edad` varchar(3) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `determinado`, `nombre`, `apellido`, `direccion`, `email`, `dni`, `contraseña`, `cuit_cuil`, `rol`, `fecha_nac`, `edad`, `estado`) VALUES
(2, NULL, 'Gonzalo', 'Figueras', 'Avenida Boyacá 1994, 5to 24', 'gonzalofigueras@gmail.com', '31932764', '$2a$10$R8Gvdn0p3JCJ3kl4JCkeX.zzg/rddXD8U.YpJOvmqNp/WbBR6JzVu', '23-31932764-9', 'Estudiante', '1985-12-01', '35', 'ACTIVO'),
(3, NULL, 'Juan', 'perez', 'tu casa 123', 'gonzalofigueras1@gmail.com', '56456789', '$2a$10$O0v/WVeF1bcy.IO1BWtOl.139vIgcKnQd/xQ/qBfnKuffEVzw9kNq', '654987', 'docente', '1985-12-01', '28', 'ACTIVO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
