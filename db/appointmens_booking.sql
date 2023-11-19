/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for doctor_appointments
CREATE DATABASE IF NOT EXISTS `doctor_appointments` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `doctor_appointments`;

-- Dumping structure for table doctor_appointments.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street_address` varchar(150) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table doctor_appointments.addresses: ~2 rows (approximately)
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` (`id`, `street_address`, `city`, `country`) VALUES
	(1, '123 Main St', 'Cityville', 'Countryland'),
	(2, '456 Elm St', 'Townsville', 'Countryland');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;

-- Dumping structure for table doctor_appointments.appointments
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `appointment_datetime` datetime DEFAULT NULL,
  `status` enum('scheduled','canceled','completed') DEFAULT 'scheduled',
  `reason` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_ibfk_1` (`patient_id`),
  KEY `appointments_ibfk_2` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Change enum values for status in the appointments table with 'pending' as default
ALTER TABLE `appointments`
MODIFY COLUMN `status` ENUM('pending', 'scheduled', 'canceled', 'completed') DEFAULT 'pending';

-- Dumping data for table doctor_appointments.appointments: ~2 rows (approximately)
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `appointment_datetime`, `status`, `reason`) VALUES
	(1, 1, 1, '2023-01-20 10:00:00', 'scheduled', 'Regular checkup'),
	(2, 2, 2, '2023-01-22 14:30:00', 'scheduled', 'Skin rash consultation');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;

-- Dumping structure for table doctor_appointments.doctors
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `clinic_address_id` int(11) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clinic_address_id` (`clinic_address_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`clinic_address_id`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table doctor_appointments.doctors: ~2 rows (approximately)
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `clinic_address_id`, `password`, `date_of_birth`) VALUES
	(1, 'John', 'Doe', 'johndoe@example.com', '123-456-7890', 1, 'hashedpassword1', NULL),
	(2, 'Alice', 'Smith', 'alicesmith@example.com', '987-654-3210', 2, 'hashedpassword2', NULL);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;

-- Dumping structure for table doctor_appointments.doctor_specialties
CREATE TABLE IF NOT EXISTS `doctor_specialties` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `specialty_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `specialty_id` (`specialty_id`),
  CONSTRAINT `FK__doctors` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__specialties` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table doctor_appointments.doctor_specialties: ~0 rows (approximately)
/*!40000 ALTER TABLE `doctor_specialties` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_specialties` ENABLE KEYS */;

-- Dumping structure for table doctor_appointments.patients
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table doctor_appointments.patients: ~2 rows (approximately)
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `date_of_birth`, `address_id`, `password`) VALUES
	(1, 'Jane', 'Johnson', 'janejohnson@example.com', '111-222-3333', '1990-05-15', 1, 'hashedpassword3'),
	(2, 'Bob', 'Brown', 'bobbrown@example.com', '444-555-6666', '1985-10-20', 2, 'hashedpassword4');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;

-- Dumping structure for table doctor_appointments.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `review_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_ibfk_1` (`patient_id`),
  KEY `reviews_ibfk_2` (`doctor_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table doctor_appointments.reviews: ~2 rows (approximately)
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` (`id`, `patient_id`, `doctor_id`, `rating`, `comment`, `review_date`) VALUES
	(1, 1, 1, 5, 'Great doctor!', '2023-01-10'),
	(2, 2, 2, 4, 'Good service.', '2023-01-12');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;

-- Dumping structure for table doctor_appointments.specialties
CREATE TABLE IF NOT EXISTS `specialties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table doctor_appointments.specialties: ~3 rows (approximately)
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
INSERT INTO `specialties` (`id`, `name`) VALUES
	(1, 'Cardiology'),
	(2, 'Dermatology'),
	(3, 'Orthopedics');
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
