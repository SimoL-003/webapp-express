-- CREATE SLUG COL
ALTER TABLE `movies_db`.`movies` 
ADD COLUMN `slug` VARCHAR(255) NULL AFTER `id`;

-- ADD SLUG TO PRE-EXISTING DATA
UPDATE `movies_db`.`movies` SET `slug` = 'inception' WHERE (`id` = '1');
UPDATE `movies_db`.`movies` SET `slug` = 'the-godfather' WHERE (`id` = '2');
UPDATE `movies_db`.`movies` SET `slug` = 'titanic' WHERE (`id` = '3');
UPDATE `movies_db`.`movies` SET `slug` = 'the-matrix' WHERE (`id` = '4');
UPDATE `movies_db`.`movies` SET `slug` = 'interstellar' WHERE (`id` = '5');

-- SET SLUG COL TO NOT NULL AND UNIQUE
ALTER TABLE `movies_db`.`movies` 
CHANGE COLUMN `slug` `slug` VARCHAR(255) NOT NULL ,
ADD UNIQUE INDEX `slug_UNIQUE` (`slug` ASC) VISIBLE;