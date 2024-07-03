-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2024 a las 04:17:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `college`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grade`
--

CREATE TABLE `grade` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Professor_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grade`
--

INSERT INTO `grade` (`Id`, `Name`, `Professor_Id`) VALUES
(8, 'Grado 2', 7),
(9, 'Grado 1', 5),
(10, 'Grado 3', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `professor`
--

CREATE TABLE `professor` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Gender` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `professor`
--

INSERT INTO `professor` (`Id`, `Name`, `Surname`, `Gender`) VALUES
(5, 'Mariana', 'Jocelyn', 0),
(6, 'Fer', 'Reyes', 0),
(7, 'Alex', 'Reyes', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student`
--

CREATE TABLE `student` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Gender` tinyint(1) NOT NULL,
  `DoB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `student`
--

INSERT INTO `student` (`Id`, `Name`, `Surname`, `Gender`, `DoB`) VALUES
(8, 'Ruben', 'Rodr[iguez', 1, '2024-05-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_grade`
--

CREATE TABLE `student_grade` (
  `Id` int(11) NOT NULL,
  `Student_Id` int(11) NOT NULL,
  `Grade_Id` int(11) NOT NULL,
  `Section` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `student_grade`
--

INSERT INTO `student_grade` (`Id`, `Student_Id`, `Grade_Id`, `Section`) VALUES
(1, 8, 10, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PROFESSOR_GRADE` (`Professor_Id`);

--
-- Indices de la tabla `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `student_grade`
--
ALTER TABLE `student_grade`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `STUDENT` (`Student_Id`),
  ADD KEY `GRADE` (`Grade_Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `grade`
--
ALTER TABLE `grade`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `professor`
--
ALTER TABLE `professor`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `student`
--
ALTER TABLE `student`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `student_grade`
--
ALTER TABLE `student_grade`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `PROFESSOR_GRADE` FOREIGN KEY (`Professor_Id`) REFERENCES `professor` (`Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `student_grade`
--
ALTER TABLE `student_grade`
  ADD CONSTRAINT `GRADE` FOREIGN KEY (`Grade_Id`) REFERENCES `grade` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `STUDENT` FOREIGN KEY (`Student_Id`) REFERENCES `student` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
