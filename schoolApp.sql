-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-09-2020 a las 23:57:13
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

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
-- Estructura de tabla para la tabla `Aulas`
--

CREATE TABLE `Aulas` (
  `Id_aulas` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Id_materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Evaluacion`
--

CREATE TABLE `Evaluacion` (
  `Id_evaluacion` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Final` tinyint(1) NOT NULL,
  `Id_materia` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `Id_aula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Materia`
--

CREATE TABLE `Materia` (
  `Id_materia` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Nota` int(2) NOT NULL,
  `Dia` varchar(10) NOT NULL,
  `Horario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `Id_usuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Email` varchar(256) NOT NULL,
  `Dni` varchar(10) NOT NULL,
  `Contraseña` varchar(256) NOT NULL,
  `Cuit_cuil` varchar(15) NOT NULL,
  `Rol` varchar(10) NOT NULL,
  `fecha_nac` date NOT NULL,
  `Edad` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`Id_usuario`, `Nombre`, `Apellido`, `Direccion`, `Email`, `Dni`, `Contraseña`, `Cuit_cuil`, `Rol`, `fecha_nac`, `Edad`) VALUES
(10, 'marcelo', 'Gutierrez', 'rems3029', 'marcelo@mail.com', '33710646', '123456', '2033710646', 'estudiante', '1988-03-29', '32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Aulas`
--
ALTER TABLE `Aulas`
  ADD PRIMARY KEY (`Id_aulas`),
  ADD UNIQUE KEY `Id_materia` (`Id_materia`);

--
-- Indices de la tabla `Evaluacion`
--
ALTER TABLE `Evaluacion`
  ADD PRIMARY KEY (`Id_evaluacion`),
  ADD UNIQUE KEY `Id_materia` (`Id_materia`),
  ADD KEY `Id_usuario` (`Id_usuario`),
  ADD KEY `Id_aula` (`Id_aula`);

--
-- Indices de la tabla `Materia`
--
ALTER TABLE `Materia`
  ADD PRIMARY KEY (`Id_materia`),
  ADD UNIQUE KEY `id_usuario` (`Id_usuario`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`Id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Aulas`
--
ALTER TABLE `Aulas`
  MODIFY `Id_aulas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Evaluacion`
--
ALTER TABLE `Evaluacion`
  MODIFY `Id_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Materia`
--
ALTER TABLE `Materia`
  MODIFY `Id_materia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `Id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
