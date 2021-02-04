-- -----------------------------------------------------
-- Schema jsoc_db
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `jsoc_db`;
CREATE DATABASE IF NOT EXISTS `jsoc_db`;
USE `jsoc_db` ;

-- -----------------------------------------------------
-- Drop all tables
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` CASCADE;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);