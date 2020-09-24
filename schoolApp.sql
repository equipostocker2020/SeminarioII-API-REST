-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-09-2020 a las 01:23:08
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
-- Estructura de tabla para la tabla `AULA`
--

CREATE TABLE `AULA` (
  `ID_AULA` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `ID_MATERIA` int(11) NOT NULL
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
  `ID_USUARIO` int(11) NOT NULL,
  `ID_AULA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EVALUACION_MATERIA_AULA`
--

CREATE TABLE `EVALUACION_MATERIA_AULA` (
  `ID_EVALUACION` int(11) NOT NULL,
  `ID_MATERIA` int(11) NOT NULL,
  `ID_AULA` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MATERIA`
--

CREATE TABLE `MATERIA` (
  `ID_MATERIA` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `NOTA` int(2) NOT NULL,
  `DIA` varchar(10) NOT NULL,
  `HORARIO` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MATERIAS_AULA`
--

CREATE TABLE `MATERIAS_AULA` (
  `ID_MATERIA` int(11) NOT NULL,
  `ID_AULA` int(11) NOT NULL,
  `AÑO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(10, 'marcelo', 'Gutierrez', 'rems3029', 'marcelo@mail.com', '33710646', '123456', '2033710646', 'estudiante', '1988-03-29', '32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO_MATERIA_AULA`
--

CREATE TABLE `USUARIO_MATERIA_AULA` (
  `ID_USUARIO` int(11) NOT NULL,
  `ID_MATERIA` int(11) NOT NULL,
  `ID_AULA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `AULA`
--
ALTER TABLE `AULA`
  ADD PRIMARY KEY (`ID_AULA`),
  ADD UNIQUE KEY `Id_materia` (`ID_MATERIA`);

--
-- Indices de la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  ADD PRIMARY KEY (`ID_EVALUACION`),
  ADD UNIQUE KEY `Id_materia` (`ID_MATERIA`),
  ADD KEY `Id_usuario` (`ID_USUARIO`),
  ADD KEY `Id_aula` (`ID_AULA`);

--
-- Indices de la tabla `EVALUACION_MATERIA_AULA`
--
ALTER TABLE `EVALUACION_MATERIA_AULA`
  ADD PRIMARY KEY (`ID_EVALUACION`,`ID_MATERIA`,`ID_AULA`,`ID_USUARIO`);

--
-- Indices de la tabla `MATERIA`
--
ALTER TABLE `MATERIA`
  ADD PRIMARY KEY (`ID_MATERIA`),
  ADD UNIQUE KEY `id_usuario` (`ID_USUARIO`);

--
-- Indices de la tabla `MATERIAS_AULA`
--
ALTER TABLE `MATERIAS_AULA`
  ADD PRIMARY KEY (`ID_MATERIA`,`ID_AULA`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`ID_USUARIO`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD UNIQUE KEY `Dni` (`DNI`),
  ADD UNIQUE KEY `Cuit_cuil` (`CUIT_CUIL`);

--
-- Indices de la tabla `USUARIO_MATERIA_AULA`
--
ALTER TABLE `USUARIO_MATERIA_AULA`
  ADD PRIMARY KEY (`ID_USUARIO`,`ID_MATERIA`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `AULA`
--
ALTER TABLE `AULA`
  MODIFY `ID_AULA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  MODIFY `ID_EVALUACION` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `MATERIA`
--
ALTER TABLE `MATERIA`
  MODIFY `ID_MATERIA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
