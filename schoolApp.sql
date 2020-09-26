-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 26-09-2020 a las 23:23:12
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
  `NOMBRE_AULA` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `AULA`
--

INSERT INTO `AULA` (`ID_AULA`, `NOMBRE_AULA`) VALUES
(1, 'AULA MAGNA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `AULAS_MATERIAS`
--

CREATE TABLE `AULAS_MATERIAS` (
  `ID_AULA` int(11) NOT NULL,
  `ID_MATERIA` int(11) NOT NULL,
  `ANHO` varchar(50) NOT NULL,
  `ID_REL` int(11) NOT NULL,
  `ID_INSTANCIA` int(11) DEFAULT NULL,
  `ID_DOCENTE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `AULAS_MATERIAS`
--

INSERT INTO `AULAS_MATERIAS` (`ID_AULA`, `ID_MATERIA`, `ANHO`, `ID_REL`, `ID_INSTANCIA`, `ID_DOCENTE`) VALUES
(1, 1, '2021', 1, NULL, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EVALUACION`
--

CREATE TABLE `EVALUACION` (
  `ID_EVALUACION` int(11) NOT NULL,
  `ID_MATERIA` int(11) DEFAULT NULL,
  `FECHA` date NOT NULL,
  `FINAL` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INSCRIPCION`
--

CREATE TABLE `INSCRIPCION` (
  `ID_INSCRIPCION` int(11) NOT NULL,
  `ID_ALUMNO` int(11) DEFAULT NULL,
  `ID_AULA_MATERIA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `INSCRIPCION`
--

INSERT INTO `INSCRIPCION` (`ID_INSCRIPCION`, `ID_ALUMNO`, `ID_AULA_MATERIA`) VALUES
(1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INSTANCIA_EVALUACION`
--

CREATE TABLE `INSTANCIA_EVALUACION` (
  `ID_INSTANCIA` int(11) NOT NULL
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
(1, 'AULA MAGNA', 'Lunes', '18.30 a 21.30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `NOTA_ALUMNO`
--

CREATE TABLE `NOTA_ALUMNO` (
  `ID_NOTA` int(11) NOT NULL,
  `ID_INSCRIPCION` int(11) DEFAULT NULL,
  `ID_INSTANCIA` int(11) DEFAULT NULL,
  `NOTA` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

CREATE TABLE `USUARIO` (
  `ID_USUARIO` int(11) NOT NULL,
  `DETERMINANDO` varchar(50) DEFAULT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `APELLIDO` varchar(50) NOT NULL,
  `DIRECCION` varchar(100) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `DNI` varchar(10) NOT NULL,
  `CONTRASEÑA` varchar(255) NOT NULL,
  `CUIT_CUIL` varchar(15) NOT NULL,
  `ROL` varchar(10) NOT NULL,
  `FECHA_NAC` date NOT NULL,
  `EDAD` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `USUARIO`
--

INSERT INTO `USUARIO` (`ID_USUARIO`, `DETERMINANDO`, `NOMBRE`, `APELLIDO`, `DIRECCION`, `EMAIL`, `DNI`, `CONTRASEÑA`, `CUIT_CUIL`, `ROL`, `FECHA_NAC`, `EDAD`) VALUES
(2, NULL, 'Gonzalo', 'Figueras', 'Avenida Boyacá 1994, 5to 24', 'gonzalofigueras@gmail.com', '31932764', '$2a$10$R8Gvdn0p3JCJ3kl4JCkeX.zzg/rddXD8U.YpJOvmqNp/WbBR6JzVu', '23-31932764-9', 'Estudiante', '1985-12-01', '35'),
(3, NULL, 'Juan', 'perez', 'tu casa 123', 'gonzalofigueras1@gmail.com', '56456789', '$2a$10$O0v/WVeF1bcy.IO1BWtOl.139vIgcKnQd/xQ/qBfnKuffEVzw9kNq', '654987', 'docente', '1985-12-01', '28');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `AULA`
--
ALTER TABLE `AULA`
  ADD PRIMARY KEY (`ID_AULA`);

--
-- Indices de la tabla `AULAS_MATERIAS`
--
ALTER TABLE `AULAS_MATERIAS`
  ADD PRIMARY KEY (`ID_REL`),
  ADD UNIQUE KEY `unique` (`ANHO`,`ID_MATERIA`,`ID_AULA`),
  ADD KEY `IXFK_AULAS_MATERIAS_AULA` (`ID_AULA`),
  ADD KEY `IXFK_AULAS_MATERIAS_DOCENTE` (`ID_DOCENTE`),
  ADD KEY `IXFK_AULAS_MATERIAS_INSTANCIA_EVALUACION` (`ID_INSTANCIA`),
  ADD KEY `IXFK_AULAS_MATERIAS_MATERIA` (`ID_MATERIA`);

--
-- Indices de la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  ADD PRIMARY KEY (`ID_EVALUACION`),
  ADD KEY `IXFK_EVALUACION_MATERIA` (`ID_MATERIA`);

--
-- Indices de la tabla `INSCRIPCION`
--
ALTER TABLE `INSCRIPCION`
  ADD PRIMARY KEY (`ID_INSCRIPCION`),
  ADD UNIQUE KEY `Unique` (`ID_ALUMNO`,`ID_AULA_MATERIA`),
  ADD KEY `IXFK_INSCRIPCION_ALUMNOS` (`ID_ALUMNO`),
  ADD KEY `IXFK_INSCRIPCION_AULAS_MATERIAS` (`ID_AULA_MATERIA`);

--
-- Indices de la tabla `INSTANCIA_EVALUACION`
--
ALTER TABLE `INSTANCIA_EVALUACION`
  ADD PRIMARY KEY (`ID_INSTANCIA`);

--
-- Indices de la tabla `MATERIA`
--
ALTER TABLE `MATERIA`
  ADD PRIMARY KEY (`ID_MATERIA`);

--
-- Indices de la tabla `NOTA_ALUMNO`
--
ALTER TABLE `NOTA_ALUMNO`
  ADD PRIMARY KEY (`ID_NOTA`),
  ADD UNIQUE KEY `UNICA` (`ID_INSCRIPCION`,`ID_INSTANCIA`),
  ADD KEY `IXFK_NOTA_ALUMNO_INSCRIPCION` (`ID_INSCRIPCION`),
  ADD KEY `IXFK_NOTA_ALUMNO_INSCRIPCION_02` (`ID_INSCRIPCION`),
  ADD KEY `IXFK_NOTA_ALUMNO_INSTANCIA_EVALUACION` (`ID_INSTANCIA`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`ID_USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `AULA`
--
ALTER TABLE `AULA`
  MODIFY `ID_AULA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `AULAS_MATERIAS`
--
ALTER TABLE `AULAS_MATERIAS`
  MODIFY `ID_REL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  MODIFY `ID_EVALUACION` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `INSCRIPCION`
--
ALTER TABLE `INSCRIPCION`
  MODIFY `ID_INSCRIPCION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `INSTANCIA_EVALUACION`
--
ALTER TABLE `INSTANCIA_EVALUACION`
  MODIFY `ID_INSTANCIA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `MATERIA`
--
ALTER TABLE `MATERIA`
  MODIFY `ID_MATERIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `NOTA_ALUMNO`
--
ALTER TABLE `NOTA_ALUMNO`
  MODIFY `ID_NOTA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `AULAS_MATERIAS`
--
ALTER TABLE `AULAS_MATERIAS`
  ADD CONSTRAINT `FK_AULAS_MATERIAS_AULA` FOREIGN KEY (`ID_AULA`) REFERENCES `AULA` (`ID_AULA`),
  ADD CONSTRAINT `FK_AULAS_MATERIAS_MATERIA` FOREIGN KEY (`ID_MATERIA`) REFERENCES `MATERIA` (`ID_MATERIA`),
  ADD CONSTRAINT `FK_AULAS_MATERIA_INSTANCIA_EVALUACION` FOREIGN KEY (`ID_INSTANCIA`) REFERENCES `INSTANCIA_EVALUACION` (`ID_INSTANCIA`),
  ADD CONSTRAINT `FK_USUARIO_DOCENTE` FOREIGN KEY (`ID_DOCENTE`) REFERENCES `USUARIO` (`ID_USUARIO`);

--
-- Filtros para la tabla `EVALUACION`
--
ALTER TABLE `EVALUACION`
  ADD CONSTRAINT `FK_EVALUACION_MATERIA` FOREIGN KEY (`ID_MATERIA`) REFERENCES `MATERIA` (`ID_MATERIA`);

--
-- Filtros para la tabla `INSCRIPCION`
--
ALTER TABLE `INSCRIPCION`
  ADD CONSTRAINT `FK_INSCRIPCION_AULAS_MATERIAS` FOREIGN KEY (`ID_AULA_MATERIA`) REFERENCES `AULAS_MATERIAS` (`ID_REL`),
  ADD CONSTRAINT `INSCRIPCION_ibfk_1` FOREIGN KEY (`ID_ALUMNO`) REFERENCES `USUARIO` (`ID_USUARIO`);

--
-- Filtros para la tabla `NOTA_ALUMNO`
--
ALTER TABLE `NOTA_ALUMNO`
  ADD CONSTRAINT `FK_NOTA_ALUMNO_INSCRIPCION` FOREIGN KEY (`ID_INSCRIPCION`) REFERENCES `INSCRIPCION` (`ID_INSCRIPCION`),
  ADD CONSTRAINT `FK_NOTA_ALUMNO_INSCRIPCION_02` FOREIGN KEY (`ID_INSCRIPCION`) REFERENCES `INSCRIPCION` (`ID_INSCRIPCION`),
  ADD CONSTRAINT `FK_NOTA_ALUMNO_INSTANCIA_EVALUACION` FOREIGN KEY (`ID_INSTANCIA`) REFERENCES `INSTANCIA_EVALUACION` (`ID_INSTANCIA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
