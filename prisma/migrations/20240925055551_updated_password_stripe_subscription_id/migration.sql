/*
  Warnings:

  - Added the required column `password` to the `SecuritySettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeSubscriptionID` to the `UserProfileSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `securitysettings` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userprofilesubscription` ADD COLUMN `stripeSubscriptionID` VARCHAR(191) NOT NULL;
