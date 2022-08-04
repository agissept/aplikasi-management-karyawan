-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 04, 2022 at 04:49 PM
-- Server version: 10.8.3-MariaDB-1:10.8.3+maria~jammy
-- PHP Version: 8.0.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kepegawaian`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `user_id`, `created_at`) VALUES
(11, 1111, '2022-08-01 14:37:22'),
(12, 1111, '2022-08-03 00:12:33'),
(13, 1111, '2022-08-03 00:14:45'),
(14, 1111, '2022-08-03 00:15:08'),
(15, 1111, '2022-08-03 00:15:10'),
(16, 1111, '2022-08-03 00:15:11'),
(17, 1111, '2022-08-03 00:15:11'),
(18, 1111, '2022-08-04 15:47:25');

-- --------------------------------------------------------

--
-- Table structure for table `paid_leaves`
--

CREATE TABLE `paid_leaves` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paid_leaves`
--

INSERT INTO `paid_leaves` (`id`, `user_id`, `reason`, `date`, `created_at`) VALUES
(23, 1111, '1111', '2020-09-09', '2022-08-04 16:16:18'),
(24, 1111, '1111', '2022-08-04', '2022-08-04 16:26:37'),
(25, 1111, '1111', '2022-08-05', '2022-08-04 16:26:37'),
(26, 1111, '1111', '2022-08-06', '2022-08-04 16:27:28'),
(27, 1111, '1111', '2022-08-07', '2022-08-04 16:27:28'),
(28, 1111, '1111', '2022-08-08', '2022-08-04 16:29:24'),
(29, 1111, '1111', '2022-08-09', '2022-08-04 16:29:24'),
(30, 1111, '1111', '2022-08-10', '2022-08-04 16:29:24'),
(31, 1111, '1111', '2022-08-11', '2022-08-04 16:29:24'),
(32, 1111, '1111', '2022-08-12', '2022-08-04 16:29:24'),
(33, 1111, '1111', '2022-08-13', '2022-08-04 16:29:24'),
(34, 1111, '1111', '2022-08-15', '2022-08-04 16:29:51');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `nip` varchar(10) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `alamat_kota` varchar(30) NOT NULL,
  `usia` int(2) NOT NULL,
  `kode_jabatan` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabel identias pegawai';

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`nip`, `nama_lengkap`, `alamat_kota`, `usia`, `kode_jabatan`) VALUES
('10121269', 'Elon Musk', 'Chicago', 49, 'J0008'),
('10121906', 'Yasfa', 'Cimahi', 22, 'J007'),
('10121917', 'Agista Septiyanto', 'Cimahi', 21, 'J001'),
('10191704', 'Siswanto', 'Bandung Barat', 27, 'J007'),
('10191705', 'Dini Yuliani', 'Bandung Barat', 22, 'J007'),
('10191707', 'Rizki Ananda', 'Bandung ', 19, 'J006');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` enum('admin','employee') NOT NULL DEFAULT 'employee',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `password`, `role`, `created_at`, `time_stamp`) VALUES
(111, '111', '111', 'employee', '2022-08-03 17:12:25', '2022-08-03 17:12:25'),
(121, '121', '121', 'employee', '2022-07-31 07:15:20', '2022-07-31 07:15:20'),
(1111, 'Asep', '1111', 'employee', '2022-07-31 07:41:18', '2022-07-31 07:41:18'),
(2222, 'tatang', '2222', 'employee', '2022-08-04 16:43:00', '2022-08-04 16:43:00'),
(12131, 'asdsad', '1234', 'employee', '2022-07-31 06:18:26', '2022-07-31 06:18:26'),
(123456, '123456', '123456', 'employee', '2022-08-03 16:52:28', '2022-08-03 16:52:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendances_ibfk_1` (`user_id`);

--
-- Indexes for table `paid_leaves`
--
ALTER TABLE `paid_leaves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`nip`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `paid_leaves`
--
ALTER TABLE `paid_leaves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;