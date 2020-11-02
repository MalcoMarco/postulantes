-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 02-11-2020 a las 16:02:40
-- Versión del servidor: 8.0.22-0ubuntu0.20.04.2
-- Versión de PHP: 7.2.34-2+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `adonis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acreditacions`
--

CREATE TABLE `acreditacions` (
  `id` int UNSIGNED NOT NULL,
  `postulante_id` int UNSIGNED NOT NULL,
  `denominacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `entidad` varchar(255) NOT NULL,
  `horas` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `acreditacions`
--

INSERT INTO `acreditacions` (`id`, `postulante_id`, `denominacion`, `entidad`, `horas`, `fecha`, `filepath`, `created_at`, `updated_at`) VALUES
(7, 21, 'no se uq denominacion poner aqui sd', 'la entidad fantasmal', '150 horas', '2020-06-03', '/uploads/1591595571806-contratacion.docx', '2020-06-08 00:52:51', '2020-06-08 00:52:51'),
(9, 24, 'd1', 'la entidad fantasmal', 'dd1', '2020-06-02', '/uploads/1591595914444-Screenshot_2020-06-06 WORKANA Contrata freelancers, encuentra trabajo.png', '2020-06-08 00:58:34', '2020-06-08 00:58:34'),
(10, 29, 'no se uq denominacion poner aqui sd', 'd1', '150 horas', '2020-06-16', '/uploads/1591598402672-Captura de pantalla de 2020-06-04 17-43-38.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(11, 29, 'd20', 'e2', 'h2', '2020-06-17', '/uploads/1591598402680-Screenshot_2020-05-25 Pedido Confirmado.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '1503248427885_user', 1, '2020-06-02 17:50:09'),
(2, '1503248427886_token', 1, '2020-06-02 17:50:11'),
(3, '1591061006869_postulantes_schema', 1, '2020-06-02 17:50:12'),
(4, '1591061515059_cargos_schema', 1, '2020-06-02 17:50:13'),
(5, '1591062123147_cargos_postulante_schema', 1, '2020-06-02 17:50:14'),
(6, '1591064363302_acreditaciones_schema', 1, '2020-06-02 17:50:17'),
(7, '1591064396340_expgenerals_schema', 1, '2020-06-02 17:50:20'),
(8, '1591064420578_expespecificas_schema', 1, '2020-06-02 17:50:22'),
(9, '1591070893327_estudiotipos_schema', 1, '2020-06-02 17:50:22'),
(10, '1591070903093_estudios_schema', 1, '2020-06-02 17:50:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'COORDINADORES LOCALES PP 0068', '2020-06-02 12:51:25', '2020-06-02 12:51:25'),
(2, 'PROFESIONAL ADMINISTRATIVO PREVAED', '2020-06-02 13:01:53', '2020-06-02 13:01:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudios`
--

CREATE TABLE `estudios` (
  `id` int UNSIGNED NOT NULL,
  `postulante_id` int UNSIGNED NOT NULL,
  `estudiotipo_id` int UNSIGNED NOT NULL,
  `universidad` varchar(255) NOT NULL,
  `mencion` varchar(255) NOT NULL,
  `expedicion` date NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estudios`
--

INSERT INTO `estudios` (`id`, `postulante_id`, `estudiotipo_id`, `universidad`, `mencion`, `expedicion`, `filepath`, `created_at`, `updated_at`) VALUES
(16, 29, 1, 'la UNI', 'MENCION UNI', '2020-06-18', '/uploads/1591598402531-nezuko.jpg', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(17, 29, 2, 'UNI2', 'M2', '2020-06-12', '/uploads/1591598402537-1086316.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(18, 29, 3, 'universida Catolioca', 'M3', '2020-06-25', '/uploads/1591598402543-932871.jpg', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(19, 29, 4, 'Universidad Nacional del santa', 'no se bro', '2020-06-11', '/uploads/1591598402551-807015.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(20, 31, 4, 'Universidad Nacional del santa', 'no se bro', '2020-06-03', '/uploads/1591917856112-kha.jpg', '2020-06-11 18:24:16', '2020-06-11 18:24:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiotipos`
--

CREATE TABLE `estudiotipos` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estudiotipos`
--

INSERT INTO `estudiotipos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'GRADO DE MAESTRIA', NULL, NULL),
(2, 'EGRESADO DE MAESTRIA', NULL, NULL),
(3, 'TÍTULO PROFESIONAL ', NULL, NULL),
(4, 'GRADO DE BACHILLER', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencias`
--

CREATE TABLE `experiencias` (
  `id` int UNSIGNED NOT NULL,
  `postulante_id` int UNSIGNED NOT NULL,
  `experienciastipo_id` int NOT NULL,
  `entidad` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `periodo` varchar(255) NOT NULL,
  `tiempo` varchar(255) NOT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `experiencias`
--

INSERT INTO `experiencias` (`id`, `postulante_id`, `experienciastipo_id`, `entidad`, `cargo`, `periodo`, `tiempo`, `filepath`, `created_at`, `updated_at`) VALUES
(7, 28, 1, 'e1', 'c1', 'p1', '5', '/uploads/1591597752836-MALCOAV.docx', '2020-06-08 01:29:12', '2020-06-08 01:29:12'),
(8, 28, 1, 'e2', 'c2', 'p3', '45', '/uploads/1591597752846-Screenshot_2020-06-06 WORKANA Contrata freelancers, encuentra trabajo.png', '2020-06-08 01:29:12', '2020-06-08 01:29:12'),
(9, 29, 1, 'e1', 'c1', 'p1', '5', '/uploads/1591598402696-contratacion.docx', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(10, 29, 1, 'e2', 'c2', 'p3', '45', '/uploads/1591598402702-Captura de pantalla de 2020-05-24 20-53-02.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(11, 29, 2, 'E5', 'c3', 'p5', '5', '/uploads/1591598402729-Captura de pantalla de 2020-05-16 18-30-43.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(12, 29, 2, 'eR', 'CA2', 'PP4', '452', '/uploads/1591598402782-Captura de pantalla de 2020-05-16 18-30-43.png', '2020-06-08 01:40:02', '2020-06-08 01:40:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experienciastipos`
--

CREATE TABLE `experienciastipos` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `experienciastipos`
--

INSERT INTO `experienciastipos` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'Experiencia General', NULL, NULL),
(2, 'Experiencia Especifica', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulantes`
--

CREATE TABLE `postulantes` (
  `id` int UNSIGNED NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `carreraprofesional` varchar(255) NOT NULL,
  `movil` varchar(25) NOT NULL,
  `cargo_id` int UNSIGNED NOT NULL,
  `ugel` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `postulantes`
--

INSERT INTO `postulantes` (`id`, `fullname`, `dni`, `email`, `carreraprofesional`, `movil`, `cargo_id`, `ugel`, `created_at`, `updated_at`) VALUES
(21, 'Malco Marco Minaya Pumaricra', '70153608', 'burgossantos@gmail.com', 'ingenieria de sistemas e informatica', '454568', 1, NULL, '2020-06-08 00:52:51', '2020-06-08 00:52:51'),
(23, 'Malco Marco Minaya Pumaricra', '70153608', 'aulaperutic@gmail.com', 'ingenieria de sistemas e informatica', '454568', 2, NULL, '2020-06-08 00:57:23', '2020-06-08 00:57:23'),
(24, 'Malco Marco Minaya Pumaricra 2019', '70153608', 'minayamalco@gmail.com', 'ingenieria Ambiental', '45', 1, NULL, '2020-06-08 00:58:34', '2020-06-08 00:58:34'),
(25, 'Malco Marco Minaya Pumaricra 2019', '19248280', 'minayamalco@gmail.com', 'ingenieria de sistemas e informatica', '454568', 1, NULL, '2020-06-08 01:06:03', '2020-06-08 01:06:03'),
(26, 'Malco Marco Minaya Pumaricra 2019', '19248280', 'minayamalco@gmail.com', 'ingenieria de sistemas e informatica', '454568', 1, NULL, '2020-06-08 01:06:35', '2020-06-08 01:06:35'),
(28, 'Malco Marco Minaya Pumaricra', 'a', 'aulaperutic@gmail.com', 'ingenieria de sistemas e informatica', '454568', 1, NULL, '2020-06-08 01:29:12', '2020-06-08 01:29:12'),
(29, 'Malco Marco Minaya Pumaricra 2019', '7197094567', 'malco@sitaav.org', 'ingenieria civil', '454568', 1, NULL, '2020-06-08 01:40:02', '2020-06-08 01:40:02'),
(30, 'Malco Marco Minaya Pumaricra', '71970942', 'admin@lafuerzadelpueblo.org.do', 'ingenieria Ambiental', '454568', 1, NULL, '2020-06-11 17:07:12', '2020-06-11 17:07:12'),
(31, 'Malco Marco Minaya Pumaricra', '19248280', 'admin@lafuerzadelpueblo.org.do', 'ingenieria civil', '45', 1, 'Ugel del santa', '2020-06-11 18:24:16', '2020-06-11 18:24:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `id` int NOT NULL,
  `name` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`id`, `name`) VALUES
(1, NULL),
(2, 4545),
(3, 55),
(4, 22),
(5, 33333),
(6, 2),
(7, 22),
(8, 4),
(9, 4),
(10, 4),
(11, 4),
(12, 4),
(13, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'MalcoMarco', 'minayamalco@gmail.com', '$2a$10$m9ijI3REFr1eOPkaU0JFFe9d3HqbM54MRkmrD78eofJEb0.tcyRFO', '2020-06-03 21:12:25', '2020-06-03 21:12:25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acreditacions`
--
ALTER TABLE `acreditacions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acreditaciones_postulante_id_foreign` (`postulante_id`);

--
-- Indices de la tabla `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estudios`
--
ALTER TABLE `estudios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudios_estudiotipo_id_foreign` (`estudiotipo_id`),
  ADD KEY `estudios_postulante_id_foreign` (`postulante_id`);

--
-- Indices de la tabla `estudiotipos`
--
ALTER TABLE `estudiotipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `experiencias`
--
ALTER TABLE `experiencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expgenerals_postulante_id_foreign` (`postulante_id`);

--
-- Indices de la tabla `experienciastipos`
--
ALTER TABLE `experienciastipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `postulantes`
--
ALTER TABLE `postulantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postulantes_cargo_id_foreign` (`cargo_id`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_unique` (`token`),
  ADD KEY `tokens_user_id_foreign` (`user_id`),
  ADD KEY `tokens_token_index` (`token`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acreditacions`
--
ALTER TABLE `acreditacions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estudios`
--
ALTER TABLE `estudios`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `estudiotipos`
--
ALTER TABLE `estudiotipos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `experiencias`
--
ALTER TABLE `experiencias`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `experienciastipos`
--
ALTER TABLE `experienciastipos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `postulantes`
--
ALTER TABLE `postulantes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acreditacions`
--
ALTER TABLE `acreditacions`
  ADD CONSTRAINT `acreditaciones_postulante_id_foreign` FOREIGN KEY (`postulante_id`) REFERENCES `postulantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudios`
--
ALTER TABLE `estudios`
  ADD CONSTRAINT `estudios_estudiotipo_id_foreign` FOREIGN KEY (`estudiotipo_id`) REFERENCES `estudiotipos` (`id`),
  ADD CONSTRAINT `estudios_postulante_id_foreign` FOREIGN KEY (`postulante_id`) REFERENCES `postulantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `experiencias`
--
ALTER TABLE `experiencias`
  ADD CONSTRAINT `expgenerals_postulante_id_foreign` FOREIGN KEY (`postulante_id`) REFERENCES `postulantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `postulantes`
--
ALTER TABLE `postulantes`
  ADD CONSTRAINT `postulantes_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`);

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
