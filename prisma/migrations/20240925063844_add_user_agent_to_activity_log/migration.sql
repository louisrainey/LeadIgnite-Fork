/*
  Warnings:

  - Added the required column `userAgent` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activitylog` ADD COLUMN `userAgent` VARCHAR(191) NOT NULL;
