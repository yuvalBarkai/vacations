-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2022 at 01:25 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdb`
--
CREATE DATABASE IF NOT EXISTS `vacationsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`) VALUES
(2, 77),
(2, 78),
(3, 78),
(3, 80),
(5, 78),
(5, 79),
(5, 80),
(6, 76),
(6, 77),
(6, 78),
(6, 79),
(6, 80);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `password`) VALUES
(1, 'Administrator', 'Manager', 'admin', 'admin'),
(2, 'Asterix', 'Odrazo', 'asterix', '123456'),
(3, 'Obelix', 'Gosini', 'obelix', '123123'),
(4, 'Jonathan', 'Harush', 'jon123', 'john123123'),
(5, 'Maya', 'Yamaha', 'keyboard', 'contraOctava'),
(6, 'Mike', 'piano', 'forte', '88keys');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(11) NOT NULL,
  `vacation_description` varchar(300) NOT NULL,
  `vacation_destination` varchar(40) NOT NULL,
  `image_location` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `vacation_description`, `vacation_destination`, `image_location`, `start_date`, `end_date`, `price`, `followers`) VALUES
(76, 'Amazing views of budapest, with fair prices and great nature.', 'Hungary, Budapest', 'e5d9fd22-2101-41be-ada3-78a2094761ea.jpg', '2022-12-30', '2023-01-06', 9000, 1),
(77, 'A great little island in greece where you can enjoy the slience and some wild adventures', 'Greece, Kos', '193df91f-2d1c-41f1-a70f-dd4f59b7cdd4.jpg', '2022-12-24', '2023-01-03', 5000, 2),
(78, 'Seeing the breath taking views of Peru, eating some great food and hiking on some of the most spectacular mountains', 'Peru, Machu Pichu', '0486243d-5076-4455-b526-f1875e989107.jpg', '2023-02-01', '2023-02-11', 16000, 4),
(79, 'Never ending horizons, beautiful trails and lakes, you will probably enjoy the nature of Yosemite park ', 'California, Yosemite', '34713b46-48e0-4e75-ba4b-b9b929c233f7.jpg', '2023-01-26', '2023-02-04', 19000, 2),
(80, 'Great food, clean street, truly incredible views and cultures you should experience.', 'Japan, Tokyo', '4f118cc1-09f6-4cb7-8a22-a57b43c14c1e.jpg', '2023-03-23', '2023-03-30', 15600, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
