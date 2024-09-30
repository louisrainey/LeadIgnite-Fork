/*
  Warnings:

  - You are about to alter the column `callType` on the `callcampaign` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(12))`.
  - You are about to alter the column `status` on the `textcampaign` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(14))`.
  - Added the required column `name` to the `CallCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `CallCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CallCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EmailCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `EmailCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `EmailCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SocialMediaCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `SocialMediaCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SocialMediaCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TextCampaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `TextCampaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `callcampaign` ADD COLUMN `aiAvatarAgent` VARCHAR(191) NULL,
    ADD COLUMN `aiScript` VARCHAR(191) NULL,
    ADD COLUMN `aiVoice` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `goal` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('delivered', 'delivering', 'failed', 'pending', 'completed', 'missed', 'queued', 'read', 'unread') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `callType` ENUM('inboundPhoneCall', 'outboundPhoneCall', 'webCall') NOT NULL;

-- AlterTable
ALTER TABLE `emailcampaign` ADD COLUMN `aiAvatarAgent` VARCHAR(191) NULL,
    ADD COLUMN `aiScript` VARCHAR(191) NULL,
    ADD COLUMN `aiVoice` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `goal` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('delivered', 'delivering', 'failed', 'pending', 'completed', 'missed', 'queued', 'read', 'unread') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `socialmediacampaign` ADD COLUMN `aiAvatarAgent` VARCHAR(191) NULL,
    ADD COLUMN `aiScript` VARCHAR(191) NULL,
    ADD COLUMN `aiVoice` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `goal` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('delivered', 'delivering', 'failed', 'pending', 'completed', 'missed', 'queued', 'read', 'unread') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `textcampaign` ADD COLUMN `aiAvatarAgent` VARCHAR(191) NULL,
    ADD COLUMN `aiScript` VARCHAR(191) NULL,
    ADD COLUMN `aiVoice` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `goal` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `status` ENUM('delivered', 'delivering', 'failed', 'pending', 'completed', 'missed', 'queued', 'read', 'unread') NOT NULL;

-- CreateTable
CREATE TABLE `TextMessage` (
    `id` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `messageType` ENUM('TYPE_SMS', 'TYPE_EMAIL') NOT NULL,
    `locationId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,
    `conversationId` VARCHAR(191) NOT NULL,
    `dateAdded` DATETIME(3) NOT NULL,
    `body` VARCHAR(191) NULL,
    `direction` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `meta` JSON NULL,
    `source` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `textCampaignId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TextMessageAttachment` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `textMessageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailMessage` (
    `id` VARCHAR(191) NOT NULL,
    `altId` VARCHAR(191) NULL,
    `threadId` VARCHAR(191) NOT NULL,
    `locationId` VARCHAR(191) NOT NULL,
    `contactId` VARCHAR(191) NOT NULL,
    `conversationId` VARCHAR(191) NOT NULL,
    `dateAdded` DATETIME(3) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `body` VARCHAR(191) NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `replyToMessageId` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,
    `emailCampaignId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailAttachment` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `emailMessageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailRecipient` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `emailMessageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CallDetail` (
    `id` VARCHAR(191) NOT NULL,
    `orgId` VARCHAR(191) NOT NULL,
    `type` ENUM('inboundPhoneCall', 'outboundPhoneCall', 'webCall') NOT NULL,
    `phoneCallProvider` VARCHAR(191) NOT NULL,
    `phoneCallTransport` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `endedReason` VARCHAR(191) NULL,
    `messages` JSON NOT NULL,
    `destination` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `startedAt` DATETIME(3) NULL,
    `endedAt` DATETIME(3) NULL,
    `cost` DOUBLE NOT NULL,
    `costBreakdown` JSON NOT NULL,
    `transcript` VARCHAR(191) NOT NULL,
    `recordingUrl` VARCHAR(191) NULL,
    `stereoRecordingUrl` VARCHAR(191) NULL,
    `artifact` JSON NULL,
    `analysis` JSON NULL,
    `assistantId` VARCHAR(191) NULL,
    `callCampaignId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialAction` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `attempt` INTEGER NOT NULL,
    `successful` INTEGER NOT NULL,
    `failed` INTEGER NOT NULL,
    `viewLink` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `replyMessage` VARCHAR(191) NULL,
    `socialMediaCampaignId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TextMessage` ADD CONSTRAINT `TextMessage_textCampaignId_fkey` FOREIGN KEY (`textCampaignId`) REFERENCES `TextCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TextMessageAttachment` ADD CONSTRAINT `TextMessageAttachment_textMessageId_fkey` FOREIGN KEY (`textMessageId`) REFERENCES `TextMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailMessage` ADD CONSTRAINT `EmailMessage_emailCampaignId_fkey` FOREIGN KEY (`emailCampaignId`) REFERENCES `EmailCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailAttachment` ADD CONSTRAINT `EmailAttachment_emailMessageId_fkey` FOREIGN KEY (`emailMessageId`) REFERENCES `EmailMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailRecipient` ADD CONSTRAINT `EmailRecipient_emailMessageId_fkey` FOREIGN KEY (`emailMessageId`) REFERENCES `EmailMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CallDetail` ADD CONSTRAINT `CallDetail_callCampaignId_fkey` FOREIGN KEY (`callCampaignId`) REFERENCES `CallCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialAction` ADD CONSTRAINT `SocialAction_socialMediaCampaignId_fkey` FOREIGN KEY (`socialMediaCampaignId`) REFERENCES `SocialMediaCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
