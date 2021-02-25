-- -----------------------------------------------------
-- Schema jsoc_db
-- -----------------------------------------------------
-- DROP DATABASE IF EXISTS `jsoc_db`;
-- CREATE DATABASE IF NOT EXISTS `jsoc_db`;
-- USE `jsoc_db` ;

-- -----------------------------------------------------
-- Drop all tables
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` CASCADE;
DROP TABLE IF EXISTS `news_announcements` CASCADE;
DROP TABLE IF EXISTS `activation` CASCADE;
DROP TABLE IF EXISTS `events` CASCADE;
DROP TABLE IF EXISTS `links` CASCADE;
DROP TABLE IF EXISTS `blog_posts` CASCADE;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  `timeStamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `activation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `activation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `activation_token` VARCHAR(255) NULL DEFAULT NULL,
  `auth_token` VARCHAR(255) NULL DEFAULT NULL,
  `timeStamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `news_announcements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `news_announcements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` TEXT NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `timeStamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `venue` VARCHAR(255) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `rsvp_required` BOOLEAN NOT NULL DEFAULT FALSE,
  `timeStamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `links`
-- store newsletter, and other documents links
-- store resource links
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` TEXT NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `timeStamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
-- -----------------------------------------------------
-- Table `blog_posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `timeStamp` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);