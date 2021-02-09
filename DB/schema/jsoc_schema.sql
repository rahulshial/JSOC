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
DROP TABLE IF EXISTS 'news_announcements' CASCADE

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

-- -----------------------------------------------------
-- Table `news_announcements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `news_announcements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` TEXT NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
