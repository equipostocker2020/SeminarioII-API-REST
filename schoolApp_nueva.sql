/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 13.5 		*/
/*  Created On : 24-sep.-2020 22:00:41 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0 
;

/* Drop Tables */


/*DROP TABLE IF EXISTS `aula` CASCADE
;

DROP TABLE IF EXISTS `aulas_materias` CASCADE
;

DROP TABLE IF EXISTS `evaluacion` CASCADE
;

DROP TABLE IF EXISTS `inscripcion` CASCADE
;

DROP TABLE IF EXISTS `instancia_evaluacion` CASCADE
;

DROP TABLE IF EXISTS `materia` CASCADE
;

DROP TABLE IF EXISTS `nota_alumno` CASCADE
;

DROP TABLE IF EXISTS `usuario` CASCADE
;*/

/* Create Tables */

CREATE TABLE `aula`
(
	`id_aula` INT(11) NOT NULL,
	`nombre_aula` VARCHAR(50) NOT NULL,
	`estado` VARCHAR(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_Aula` PRIMARY KEY (`id_aula` ASC)
)

;

CREATE TABLE `aulas_materias`
(
	`id_aula` INT(11) NOT NULL,
	`id_materia` INT(11) NOT NULL,
	`anho` VARCHAR(50) NOT NULL,
	`id_rel` INT(11) NOT NULL,
	`id_docente` INT(11) NULL,
	`estado` VARCHAR(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_Table1` PRIMARY KEY (`id_rel` ASC)
)

;

CREATE TABLE `evaluacion`
(
	`id_evaluacion` INT(11) NOT NULL,
	`id_materia` INT(11) NOT NULL,
	`id_instancia` INT(11) NOT NULL,
	`fecha` DATE NOT NULL,
	`estado` VARCHAR(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_Evaluacion` PRIMARY KEY (`id_evaluacion` ASC)
)

;

CREATE TABLE `inscripcion`
(
	`id_inscripcion` INT(11) NOT NULL,
	`id_alumno` INT(11) NULL,
	`id_aula_materia` INT(11) NULL,
	`estado` VARCHAR(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_inscripcion` PRIMARY KEY (`id_inscripcion` ASC)
)

;

CREATE TABLE `instancia_evaluacion`
(
	`id_instancia` INT(11) NOT NULL,
	`nombre_instancia` VARCHAR(255) NOT NULL,
	`estado` VARCHAR(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_instancia_evaluacion` PRIMARY KEY (`id_instancia` ASC)
)

;

CREATE TABLE `materia` (
  `id_materia` int(11) NOT NULL,
  `nombre_materia` varchar(50) NOT NULL,
  `dia` varchar(10) NOT NULL,
  `horario` varchar(20) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_materia` PRIMARY KEY (`id_materia` ASC)
)

;

CREATE TABLE `nota_alumno` (
  `id_nota` int(11) NOT NULL,
  `id_inscripcion` int(11) DEFAULT NULL,
  `id_instancia` int(11) DEFAULT NULL,
  `nota` varchar(50) DEFAULT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_nota_alumno` PRIMARY KEY (`id_nota` ASC)
)

;

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
  `estado` varchar(10) NOT NULL DEFAULT 'ACTIVO',
	CONSTRAINT `PK_Usuario` PRIMARY KEY (`id_usuario` ASC)
)

;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `aulas_materias` 
 ADD CONSTRAINT `unique` UNIQUE (`anho` ASC, `id_materia` ASC, `id_aula` ASC)
;

ALTER TABLE `aulas_materias` 
 ADD INDEX `IXFK_aulas_materias_aula` (`id_aula` ASC)
;

ALTER TABLE `aulas_materias` 
 ADD INDEX `IXFK_aulas_materias_docente` (`id_docente` ASC)
;

ALTER TABLE `aulas_materias` 
 ADD INDEX `IXFK_aulas_materias_materia` (`id_materia` ASC)
;

ALTER TABLE `Evaluacion` 
 ADD INDEX `IXFK_evaluacion_materia` (`id_materia` ASC)
;

ALTER TABLE `inscripcion` 
 ADD CONSTRAINT `Unique` UNIQUE (`id_alumno` ASC, `id_aula_materia` ASC)
;

ALTER TABLE `inscripcion` 
 ADD INDEX `IXFK_inscripcion_alumnos` (`id_alumno` ASC)
;

ALTER TABLE `inscripcion` 
 ADD INDEX `IXFK_inscripcion_aulas_materias` (`id_aula_materia` ASC)
;

ALTER TABLE `nota_alumno` 
 ADD CONSTRAINT `unica` UNIQUE (`id_inscripcion` ASC, `id_instancia` ASC)
;

ALTER TABLE `nota_alumno` 
 ADD INDEX `IXFK_nota_alumno_inscripcion` (`id_inscripcion` ASC)
;


ALTER TABLE `nota_alumno` 
 ADD INDEX `IXFK_nota_alumno_instancia_evaluacion` (`id_instancia` ASC)
;

/* Create Foreign Key Constraints */


ALTER TABLE `aulas_materias` 
 ADD CONSTRAINT `FK_aulas_materias_aula`
	FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id_aula`) ON DELETE Restrict ON UPDATE Restrict
;


ALTER TABLE `aulas_materias` 
 ADD CONSTRAINT `FK_aulas_materias_materia`
	FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id_materia`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `aulas_materias` 
 ADD CONSTRAINT `FK_aulas_materias_docente`
	FOREIGN KEY (`id_docente`) REFERENCES `usuario` (`id_usuario`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `evaluacion` 
 ADD CONSTRAINT `FK_evaluacion_materia`
	FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id_materia`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `inscripcion` 
 ADD CONSTRAINT `FK_inscripcion_alumnos`
	FOREIGN KEY (`id_alumno`) REFERENCES `usuario` (`id_usuario`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `inscripcion` 
 ADD CONSTRAINT `FK_inscripcion_aulas_materias`
	FOREIGN KEY (`id_aula_materia`) REFERENCES `aulas_materias` (`id_rel`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `nota_alumno` 
 ADD CONSTRAINT `FK_nota_alumno_inscripcion`
	FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcion` (`id_inscripcion`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `nota_alumno` 
 ADD CONSTRAINT `FK_nota_alumno_instancia_evaluacion`
	FOREIGN KEY (`id_instancia`) REFERENCES `instancia_evaluacion` (`id_instancia`) ON DELETE Restrict ON UPDATE Restrict
;

SET FOREIGN_KEY_CHECKS=1 
;