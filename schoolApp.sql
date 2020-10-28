-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2020 a las 15:16:57
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `schoolapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula` (
  `id_aula` int(11) NOT NULL,
  `nombre_aula` varchar(50) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aula`
--

INSERT INTO `aula` (`id_aula`, `nombre_aula`, `estado`) VALUES
(1, 'La conferencia de la lora2', 'ACTIVO'),
(2, 'qweraswerfaswerwe', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aulas_materias`
--

CREATE TABLE `aulas_materias` (
  `Id_aula` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `anho` varchar(50) NOT NULL,
  `id_rel` int(11) NOT NULL,
  `id_docente` int(11) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aulas_materias`
--

INSERT INTO `aulas_materias` (`Id_aula`, `id_materia`, `anho`, `id_rel`, `id_docente`, `estado`) VALUES
(1, 1, '2020', 8, 3, 'ACTIVO'),
(2, 2, '2020', 9, 3, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_evaluacion` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `id_instancia` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id_evaluacion`, `id_materia`, `id_instancia`, `fecha`, `estado`) VALUES
(13, 1, 1, '0000-00-00', 'ACTIVO'),
(14, 1, 2, '2020-10-30', 'ACTIVO'),
(15, 3, 1, '2020-10-28', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `id_inscripcion` int(11) NOT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_aula_materia` int(11) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`id_inscripcion`, `id_alumno`, `id_aula_materia`, `estado`) VALUES
(8, 2, 8, 'ACTIVO'),
(10, 2, 9, 'ACTIVO'),
(13, 4, 8, 'ACTIVO'),
(14, 4, 9, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instancia_evaluacion`
--

CREATE TABLE `instancia_evaluacion` (
  `id_instancia` int(11) NOT NULL,
  `nombre_instancia` varchar(255) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `instancia_evaluacion`
--

INSERT INTO `instancia_evaluacion` (`id_instancia`, `nombre_instancia`, `estado`) VALUES
(1, 'Primer Parcial', 'ACTIVO'),
(2, 'Segundo Parcial', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id_materia` int(11) NOT NULL,
  `nombre_materia` varchar(50) NOT NULL,
  `dia` varchar(10) NOT NULL,
  `horario` varchar(20) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id_materia`, `nombre_materia`, `dia`, `horario`, `estado`) VALUES
(1, 'Materia de mierda3', 'Miercoles', '18:30', 'ACTIVO'),
(2, 'ahdsdsadasdsadsa', 'Miercoles', '18:30', 'ACTIVO'),
(3, 'Tu vieja', 'Jueves', '18:30', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota_alumno`
--

CREATE TABLE `nota_alumno` (
  `id_nota` int(11) NOT NULL,
  `id_inscripcion` int(11) DEFAULT NULL,
  `id_instancia` int(11) DEFAULT NULL,
  `nota` varchar(50) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `cuit_cuil` varchar(15) NOT NULL,
  `rol` varchar(11) NOT NULL,
  `fecha_nac` date NOT NULL,
  `edad` varchar(3) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `direccion`, `email`, `dni`, `contraseña`, `cuit_cuil`, `rol`, `fecha_nac`, `edad`, `estado`) VALUES
(1, 'Gonzalo', 'Figueras', 'Biarritz 2584', 'gonzalofigueras@gmail.com', '31932764', '$2a$10$HP5oI64hlKXCqNc7IxGqFe53z.3R0z/oIZIt/c59gR2fM1LUGAm9O', '23319327649', 'ADMIN', '1985-12-01', '34', 'ACTIVO'),
(2, 'Malena', 'Sayag', 'Biarrtiz 2584', 'malenasayag@gmail.com', '33837054', '$2a$10$fLNBUWEKdeBcwqycZrZJzezJzOYqlBk99HLGGJjJCoZwCtZbNJAsC', '27338370542', 'ESTUDIANTE', '0000-00-00', '32', 'ACTIVO'),
(3, 'Oliverio', 'Figueras', 'Biarritz 2584', 'oliveriofigueras@gmail.com', '56668681', '$2a$10$eTQvVefd8AtYkOfjtk5aFe0qW25eThgevGzCioYSu8c.RpriT6sJe', '23566686819', 'DOCENTE', '0000-00-00', '2', 'ACTIVO'),
(4, 'Juan', 'Perez', 'su casa', 'gonzalofigueras@gmail.com.ar', '32654987', '$2a$10$y2.02nKNRwLUZ8UhRmlaeOw3iIHEQcdflI5j1uI5Umb5cyK.6Vt72', '12456789329', 'ESTUDIANTE', '2000-10-10', '20', 'ACTIVO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`id_aula`);

--
-- Indices de la tabla `aulas_materias`
--
ALTER TABLE `aulas_materias`
  ADD PRIMARY KEY (`id_rel`),
  ADD UNIQUE KEY `unique` (`anho`,`id_materia`,`Id_aula`),
  ADD KEY `IXFK_AULAS_MATERIAS_AULA` (`Id_aula`),
  ADD KEY `IXFK_AULAS_MATERIAS_DOCENTE` (`id_docente`),
  ADD KEY `IXFK_AULAS_MATERIAS_MATERIA` (`id_materia`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `IXFK_EVALUACION_MATERIA` (`id_materia`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD UNIQUE KEY `Unique` (`id_alumno`,`id_aula_materia`),
  ADD KEY `IXFK_INSCRIPCION_ALUMNOS` (`id_alumno`),
  ADD KEY `IXFK_INSCRIPCION_AULAS_MATERIAS` (`id_aula_materia`);

--
-- Indices de la tabla `instancia_evaluacion`
--
ALTER TABLE `instancia_evaluacion`
  ADD PRIMARY KEY (`id_instancia`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id_materia`);

--
-- Indices de la tabla `nota_alumno`
--
ALTER TABLE `nota_alumno`
  ADD PRIMARY KEY (`id_nota`),
  ADD UNIQUE KEY `UNICA` (`id_inscripcion`,`id_instancia`),
  ADD KEY `IXFK_NOTA_ALUMNO_INSCRIPCION` (`id_inscripcion`),
  ADD KEY `IXFK_NOTA_ALUMNO_INSTANCIA_EVALUACION` (`id_instancia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `cuit_cuil` (`cuit_cuil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aula`
--
ALTER TABLE `aula`
  MODIFY `id_aula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `aulas_materias`
--
ALTER TABLE `aulas_materias`
  MODIFY `id_rel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `instancia_evaluacion`
--
ALTER TABLE `instancia_evaluacion`
  MODIFY `id_instancia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `nota_alumno`
--
ALTER TABLE `nota_alumno`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
