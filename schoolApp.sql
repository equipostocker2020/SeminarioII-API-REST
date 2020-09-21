-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-09-2020 a las 22:07:34
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
-- Estructura de tabla para la tabla `AULA`
--

CREATE TABLE `AULA` (
  `ID_AULA` int(11) NOT NULL,
  `NOMBRE_AULA` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EVALUACION`
--

CREATE TABLE `EVALUACION` (
  `ID_EVALUACION` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `FINAL` tinyint(1) NOT NULL,
  `ID_MATERIA` int(11) NOT NULL,
  `ID_AULA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MATERIA`
--

CREATE TABLE `MATERIA` (
  `ID_MATERIA` int(11) NOT NULL,
  `NOMBRE_MATERIA` varchar(50) NOT NULL,
  `DIA` varchar(10) NOT NULL,
  `HORARIO` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `MATERIA`
--

INSERT INTO `MATERIA` (`ID_MATERIA`, `NOMBRE_MATERIA`, `DIA`, `HORARIO`) VALUES
(1, 'seminario', 'lunes', '18.30-21.30'),
(2, 'seminario', 'jueves', '18.30-21.30'),
(3, 'trigila', 'lunes', '18:30 - 21:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

CREATE TABLE `USUARIO` (
  `ID_USUARIO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `APELLIDO` varchar(50) NOT NULL,
  `DIRECCION` varchar(100) NOT NULL,
  `EMAIL` varchar(256) NOT NULL,
  `DNI` varchar(10) NOT NULL,
  `CONTRASEÑA` varchar(256) NOT NULL,
  `CUIT_CUIL` varchar(15) NOT NULL,
  `ROL` varchar(10) NOT NULL,
  `FECHA_NAC` date NOT NULL,
  `EDAD` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`ID_USUARIO`, `NOMBRE`, `APELLIDO`, `DIRECCION`, `EMAIL`, `DNI`, `CONTRASEÑA`, `CUIT_CUIL`, `ROL`, `FECHA_NAC`, `EDAD`) VALUES
(17, 'marcelo fabian', 'Gutierrez capo', 'rems3029', 'marcelo2@mail.com', '337106461', '123456', '20337106464', 'estudiante', '1988-03-29', '32'),
(19, 'marcelo', 'Gutierrez', 'rems3029', 'marcelo3@mail.com', '33710646', '$2a$10$HYk/.UWoG2O29zG52.xE9.VoXjenFqJlu6Vuhn6P3QOd1ionsUP3C', '2033710646', 'estudiante', '1988-03-29', '32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `AULA`
--
ALTER TABLE `AULA`
  ADD PRIMARY KEY (`ID_AULA`);

--
-- Indices de la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  ADD PRIMARY KEY (`ID_EVALUACION`),
  ADD UNIQUE KEY `Id_materia` (`ID_MATERIA`),
  ADD KEY `Id_aula` (`ID_AULA`);

--
-- Indices de la tabla `MATERIA`
--
ALTER TABLE `MATERIA`
  ADD PRIMARY KEY (`ID_MATERIA`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`ID_USUARIO`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD UNIQUE KEY `Dni` (`DNI`),
  ADD UNIQUE KEY `Cuit_cuil` (`CUIT_CUIL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `AULA`
--
ALTER TABLE `AULA`
  MODIFY `ID_AULA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  MODIFY `ID_EVALUACION` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `MATERIA`
--
ALTER TABLE `MATERIA`
  MODIFY `ID_MATERIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
