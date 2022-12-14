-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 10, 2022 at 05:01 PM
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
(18, 1111, '2022-08-04 15:47:25'),
(19, 1111, '2022-08-09 14:03:47'),
(20, 1111, '2022-08-10 14:39:37');

-- --------------------------------------------------------

--
-- Table structure for table `paid_leaves`
--

CREATE TABLE `paid_leaves` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `policy` varchar(100) NOT NULL,
  `attachment` text DEFAULT NULL,
  `date` date NOT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paid_leaves`
--

INSERT INTO `paid_leaves` (`id`, `user_id`, `reason`, `policy`, `attachment`, `date`, `status`, `created_at`) VALUES
(130, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-11', 'Accepted', '2022-08-10 14:44:55'),
(131, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-12', 'Rejected', '2022-08-10 14:44:55'),
(132, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-13', 'Accepted', '2022-08-10 14:44:55'),
(133, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-14', 'Accepted', '2022-08-10 14:44:55'),
(134, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-15', 'Pending', '2022-08-10 14:44:55'),
(135, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-16', 'Pending', '2022-08-10 14:44:55'),
(136, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-17', 'Accepted', '2022-08-10 14:44:55'),
(137, 1111, '4565', 'Dinas', 'cccc.png', '2022-08-18', 'Pending', '2022-08-10 14:44:55'),
(138, 1111, '1212', 'Lembur', NULL, '2022-09-01', 'Pending', '2022-08-10 14:45:38'),
(139, 2222, '121', 'Sakit', '2022-07-25_09-48.png', '2022-08-10', 'Accepted', '2022-08-10 16:57:41'),
(140, 2222, '121', 'Sakit', '2022-07-25_09-48.png', '2022-08-11', 'Pending', '2022-08-10 16:57:41');

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
  `gender` varchar(11) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `role` enum('admin','employee') NOT NULL DEFAULT 'employee',
  `phone` varchar(20) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `profile_picture` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `gender`, `password`, `role`, `phone`, `birthdate`, `profile_picture`, `created_at`, `time_stamp`) VALUES
(1, '1', 'Male', '1', 'employee', '1212', '2022-08-26', NULL, '2022-08-10 15:28:45', '2022-08-10 15:28:45'),
(11, '12', 'Male', 'w', 'employee', '1', '2022-08-27', NULL, '2022-08-10 15:30:29', '2022-08-10 15:30:29'),
(12, '1', 'Male', '1', 'employee', '1', '2022-08-19', NULL, '2022-08-10 15:30:10', '2022-08-10 15:30:10'),
(111, 'Asep 123', 'Male', '111', 'employee', '1111', '2022-05-21', '', '2022-08-03 17:12:25', '2022-08-03 17:12:25'),
(121, 'Asep 123', 'Male', '121', 'employee', '1111', '2022-05-21', '', '2022-07-31 07:15:20', '2022-07-31 07:15:20'),
(1111, 'Asep adsd', 'Male', '1111', 'employee', '1111', '2022-05-21', 'fff.png', '2022-07-31 07:41:18', '2022-07-31 07:41:18'),
(2222, 'Asep 123', 'Male', '2222', 'admin', '1111', '2022-05-21', '', '2022-08-04 16:43:00', '2022-08-04 16:43:00'),
(5555, '5555', NULL, '5555', 'employee', NULL, NULL, NULL, '2022-08-10 15:28:24', '2022-08-10 15:28:24'),
(6666, '6666', NULL, '6666', 'employee', NULL, NULL, NULL, '2022-08-10 15:27:12', '2022-08-10 15:27:12'),
(7777, '7777', NULL, '7777', 'employee', NULL, NULL, NULL, '2022-08-10 13:10:05', '2022-08-10 13:10:05'),
(123456, 'Asep 123', 'Male', '123456', 'employee', '1111', '2022-05-21', '', '2022-08-03 16:52:28', '2022-08-03 16:52:28');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `paid_leaves_ibfk_1` (`user_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `paid_leaves`
--
ALTER TABLE `paid_leaves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `paid_leaves`
--
ALTER TABLE `paid_leaves`
  ADD CONSTRAINT `paid_leaves_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;