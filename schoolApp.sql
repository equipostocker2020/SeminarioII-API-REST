-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-09-2020 a las 05:29:47
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
(1, '2°A', 'ACTIVO'),
(2, '2°A', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aulas_materias`
--

CREATE TABLE `aulas_materias` (
  `Id_aula` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `anho` varchar(50) NOT NULL,
  `id_rel` int(11) NOT NULL,
  `id_instancia` int(11) DEFAULT NULL,
  `id_docente` int(11) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aulas_materias`
--

INSERT INTO `aulas_materias` (`Id_aula`, `id_materia`, `anho`, `id_rel`, `id_instancia`, `id_docente`, `estado`) VALUES
(1, 1, '2021', 1, NULL, 3, 'ACTIVO'),
(2, 2, '2021', 2, 2, 3, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_evaluacion` int(11) NOT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `final` tinyint(1) NOT NULL DEFAULT 0,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id_evaluacion`, `id_materia`, `fecha`, `final`, `estado`) VALUES
(1, 1, '2020-09-02', 0, 'ACTIVO'),
(2, 1, '2020-09-02', 0, 'ACTIVO'),
(3, 1, '2020-09-02', 1, 'ACTIVO');

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
(1, 2, 2, 'ACTIVO'),
(9, 2, 1, 'ACTIVO'),
(13, 3, 1, 'ACTIVO');

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
(1, 'Primer Parcial 22', 'ACTIVO'),
(2, 'Segundo Parcial', 'ACTIVO'),
(3, 'Primer Final Febrero', 'ACTIVO'),
(4, 'Segundo Final Febrero', 'ACTIVO'),
(5, 'Primer Final Julio', 'ACTIVO'),
(6, 'Segundo Final Julio', 'ACTIVO'),
(7, 'Primer final Diciembre', 'ACTIVO'),
(8, 'Segundo Final Diciembre', 'ACTIVO'),
(9, 'Prueba PUT', 'ACTIVO'),
(10, 'Primer Parcial', 'ACTIVO');

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
(1, 'Programación22', '026-09-20T', '12:00.000Z', 'ACTIVO'),
(2, 'Programación', '019-03-12T', '00:00.000Z', 'ACTIVO');

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
  `rol` varchar(10) NOT NULL,
  `fecha_nac` date NOT NULL,
  `edad` varchar(3) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `direccion`, `email`, `dni`, `contraseña`, `cuit_cuil`, `rol`, `fecha_nac`, `edad`, `estado`) VALUES
(2, 'Gonzalo', 'Figueras', 'Avenida Boyacá 1994, 5to 24', 'gonzalofigueras@gmail.com', '31932764', '$2a$10$R8Gvdn0p3JCJ3kl4JCkeX.zzg/rddXD8U.YpJOvmqNp/WbBR6JzVu', '23-31932764-9', 'Estudiante', '1985-12-01', '35', 'ACTIVO'),
(3, 'Juan', 'perez', 'tu casa 123', 'gonzalofigueras1@gmail.com', '56456789', '$2a$10$O0v/WVeF1bcy.IO1BWtOl.139vIgcKnQd/xQ/qBfnKuffEVzw9kNq', '654987', 'docente', '1985-12-01', '28', 'ACTIVO'),
(5, 'Agustin', 'Galarza', 'Avenida Boyacá 1994, 5to 24', 'gonzalofigueras@gmail.com', '319327641', '$2a$10$R8Gvdn0p3JCJ3kl4JCkeX.zzg/rddXD8U.YpJOvmqNp/WbBR6JzVu', '23-31932764-91', 'Estudiante', '1985-12-01', '35', 'ACTIVO');

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
  ADD KEY `IXFK_AULAS_MATERIAS_INSTANCIA_EVALUACION` (`id_instancia`),
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
  ADD KEY `IXFK_NOTA_ALUMNO_INSCRIPCION_02` (`id_inscripcion`),
  ADD KEY `IXFK_NOTA_ALUMNO_INSTANCIA_EVALUACION` (`id_instancia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

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
  MODIFY `id_rel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `instancia_evaluacion`
--
ALTER TABLE `instancia_evaluacion`
  MODIFY `id_instancia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `nota_alumno`
--
ALTER TABLE `nota_alumno`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
