-- AlterTable
ALTER TABLE `kanbantask` ADD COLUMN `userProfileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `KanbanTask` ADD CONSTRAINT `KanbanTask_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
