-- CreateTable
CREATE TABLE `UserProfile` (
    `id` VARCHAR(191) NOT NULL,
    `uniqueIdentifier` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `personalNum` VARCHAR(191) NOT NULL,
    `userProfileSubscriptionId` VARCHAR(191) NULL,

    UNIQUE INDEX `UserProfile_uniqueIdentifier_key`(`uniqueIdentifier`),
    UNIQUE INDEX `UserProfile_email_key`(`email`),
    INDEX `idx_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConnectedAccounts` (
    `id` VARCHAR(191) NOT NULL,
    `facebookId` VARCHAR(191) NULL,
    `instagramId` VARCHAR(191) NULL,
    `linkedinId` VARCHAR(191) NULL,
    `twitterId` VARCHAR(191) NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ConnectedAccounts_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacebookOAuthData` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `expiresIn` INTEGER NOT NULL,
    `tokenType` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstagramOAuthData` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `expiresIn` INTEGER NOT NULL,
    `tokenType` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkedInOAuthData` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `expiresIn` INTEGER NOT NULL,
    `tokenType` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwitterOAuthData` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `handle` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `expiresIn` INTEGER NOT NULL,
    `tokenType` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfileSubscription` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('monthly', 'yearly') NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `renewalDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `planDetails` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserProfileSubscription_userProfileId_key`(`userProfileId`),
    INDEX `idx_userProfile_subscription`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadPreferences` (
    `id` VARCHAR(191) NOT NULL,
    `preferredLocation` JSON NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `minLeadQuality` INTEGER NOT NULL,
    `maxBudget` DOUBLE NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LeadPreferences_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SavedSearch` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `searchCriteria` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Integration` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `status` ENUM('connected', 'disconnected') NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwoFactorAuth` (
    `id` VARCHAR(191) NOT NULL,
    `isEnabled` BOOLEAN NOT NULL,
    `methods` ENUM('sms', 'email', 'authenticatorApp') NOT NULL,
    `lastEnabledAt` DATETIME(3) NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TwoFactorAuth_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPermissions` (
    `id` VARCHAR(191) NOT NULL,
    `canGenerateLeads` BOOLEAN NOT NULL,
    `canStartCampaigns` BOOLEAN NOT NULL,
    `canViewReports` BOOLEAN NOT NULL,
    `canManageTeam` BOOLEAN NOT NULL,
    `canManageSubscription` BOOLEAN NOT NULL,
    `canAccessAI` BOOLEAN NOT NULL,
    `canMoveCompanyTasks` BOOLEAN NOT NULL,
    `canEditCompanyProfile` BOOLEAN NOT NULL,
    `teamMemberId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserPermissions_teamMemberId_key`(`teamMemberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationPreferences` (
    `id` VARCHAR(191) NOT NULL,
    `emailNotifications` BOOLEAN NOT NULL,
    `smsNotifications` BOOLEAN NOT NULL,
    `notifyForNewLeads` BOOLEAN NOT NULL,
    `notifyForCampaignUpdates` BOOLEAN NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NotificationPreferences_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'member') NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `notificationPreferencesId` VARCHAR(191) NULL,
    `twoFactorAuthId` VARCHAR(191) NULL,

    UNIQUE INDEX `TeamMember_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `performedBy` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `teamMemberId` VARCHAR(191) NULL,
    `taskTrackingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskTracking` (
    `id` VARCHAR(191) NOT NULL,
    `totalTasks` INTEGER NOT NULL,
    `tasksAssigned` INTEGER NOT NULL,
    `tasksCompleted` INTEGER NOT NULL,
    `tasksInProgress` INTEGER NOT NULL,
    `assignedTasks` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskActivity` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `performedBy` VARCHAR(191) NOT NULL,
    `taskTrackingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SecuritySettings` (
    `id` VARCHAR(191) NOT NULL,
    `lastLoginTime` DATETIME(3) NULL,
    `passwordUpdatedAt` DATETIME(3) NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SecuritySettings_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyInfo` (
    `id` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `assets` JSON NOT NULL,
    `webhook` VARCHAR(191) NULL,
    `socialMediaTags` JSON NOT NULL,
    `companyLogo` VARCHAR(191) NOT NULL,
    `GHLID` VARCHAR(191) NOT NULL,
    `forwardingNumber` VARCHAR(191) NOT NULL,
    `outreachEmail` VARCHAR(191) NOT NULL,
    `explainerVideo` VARCHAR(191) NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `companyCampaignsUserProfileId` VARCHAR(191) NOT NULL,
    `kanbanStateId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CompanyInfo_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyCampaignsUserProfile` (
    `id` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignAnalytics` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `type` ENUM('email', 'text', 'call', 'social') NOT NULL,
    `deliveredCount` INTEGER NOT NULL,
    `openedCount` INTEGER NOT NULL,
    `bouncedCount` INTEGER NOT NULL,
    `failedCount` INTEGER NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `companyInfoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadTypeGlobal` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `bed` INTEGER NOT NULL,
    `bath` INTEGER NOT NULL,
    `sqft` INTEGER NOT NULL,
    `status` ENUM('New_Lead', 'Contacted', 'Closed', 'Lost') NOT NULL,
    `followUp` DATETIME(3) NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `address1` VARCHAR(191) NOT NULL,
    `campaignID` VARCHAR(191) NULL,
    `companyInfoId` VARCHAR(191) NOT NULL,
    `leadListId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialLinks` (
    `id` VARCHAR(191) NOT NULL,
    `facebook` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `leadId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SocialLinks_leadId_key`(`leadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadList` (
    `id` VARCHAR(191) NOT NULL,
    `listName` VARCHAR(191) NOT NULL,
    `uploadDate` DATETIME(3) NOT NULL,
    `records` INTEGER NOT NULL,
    `phone` INTEGER NOT NULL,
    `dataLink` VARCHAR(191) NOT NULL,
    `emails` INTEGER NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `companyInfoId` VARCHAR(191) NULL,
    `socialsCountId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialsCount` (
    `id` VARCHAR(191) NOT NULL,
    `facebook` INTEGER NULL,
    `linkedin` INTEGER NULL,
    `instagram` INTEGER NULL,
    `twitter` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KanbanState` (
    `id` VARCHAR(191) NOT NULL,
    `draggedTask` VARCHAR(191) NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KanbanTask` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `priority` ENUM('low', 'medium', 'high') NOT NULL,
    `dueDate` DATETIME(3) NULL,
    `assignedTo` VARCHAR(191) NULL,
    `kanbanStateId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KanbanColumn` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `kanbanStateId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TextCampaign` (
    `id` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `sentAt` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `companyCampaignsUserProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailCampaign` (
    `id` VARCHAR(191) NOT NULL,
    `senderEmail` VARCHAR(191) NOT NULL,
    `recipientCount` INTEGER NOT NULL,
    `sentCount` INTEGER NOT NULL,
    `deliveredCount` INTEGER NOT NULL,
    `companyCampaignsUserProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMediaCampaign` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `senderHandle` VARCHAR(191) NOT NULL,
    `receiverHandle` VARCHAR(191) NOT NULL,
    `hashtags` JSON NOT NULL,
    `companyCampaignsUserProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CallCampaign` (
    `id` VARCHAR(191) NOT NULL,
    `callerNumber` VARCHAR(191) NOT NULL,
    `receiverNumber` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `callType` VARCHAR(191) NOT NULL,
    `companyCampaignsUserProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AIKnowledgebase` (
    `id` VARCHAR(191) NOT NULL,
    `emailTemplate` VARCHAR(191) NULL,
    `salesScript` VARCHAR(191) NULL,
    `assignedAssistantID` VARCHAR(191) NOT NULL,
    `assignedSquadID` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,
    `recordingId` VARCHAR(191) NOT NULL,
    `aIAvatarId` VARCHAR(191) NULL,
    `backgroundId` VARCHAR(191) NULL,

    UNIQUE INDEX `AIKnowledgebase_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillingHistoryItem` (
    `id` VARCHAR(191) NOT NULL,
    `invoice` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `status` ENUM('Paid', 'Unpaid') NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentDetails` (
    `id` VARCHAR(191) NOT NULL,
    `cardType` VARCHAR(191) NOT NULL,
    `cardLastFour` VARCHAR(191) NOT NULL,
    `expiry` VARCHAR(191) NOT NULL,
    `userProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PaymentDetails_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AICredits` (
    `id` VARCHAR(191) NOT NULL,
    `allotted` INTEGER NOT NULL,
    `used` INTEGER NOT NULL,
    `resetInDays` INTEGER NOT NULL,
    `subscriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AICredits_subscriptionId_key`(`subscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadCredits` (
    `id` VARCHAR(191) NOT NULL,
    `allotted` INTEGER NOT NULL,
    `used` INTEGER NOT NULL,
    `resetInDays` INTEGER NOT NULL,
    `subscriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LeadCredits_subscriptionId_key`(`subscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkipTraceCredits` (
    `id` VARCHAR(191) NOT NULL,
    `allotted` INTEGER NOT NULL,
    `used` INTEGER NOT NULL,
    `resetInDays` INTEGER NOT NULL,
    `subscriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SkipTraceCredits_subscriptionId_key`(`subscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recording` (
    `id` VARCHAR(191) NOT NULL,
    `customVoiceID` VARCHAR(191) NOT NULL,
    `voicemailFile` VARCHAR(191) NOT NULL,
    `voiceCloneId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoiceClone` (
    `id` VARCHAR(191) NOT NULL,
    `audioFile` VARCHAR(191) NOT NULL,
    `clonedVoiceID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AIAvatar` (
    `id` VARCHAR(191) NOT NULL,
    `avatarKandidFile` VARCHAR(191) NOT NULL,
    `avatarMotionFile` VARCHAR(191) NOT NULL,
    `videoDetailsId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoDetails` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `ctaText` VARCHAR(191) NOT NULL,
    `ctaLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Background` (
    `id` VARCHAR(191) NOT NULL,
    `backgroundVideoFile` VARCHAR(191) NOT NULL,
    `backgroundMusic` VARCHAR(191) NOT NULL,
    `colorSchemeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ColorScheme` (
    `id` VARCHAR(191) NOT NULL,
    `primaryColor` VARCHAR(191) NOT NULL,
    `secondaryColor` VARCHAR(191) NOT NULL,
    `accentColor` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConnectedAccounts` ADD CONSTRAINT `ConnectedAccounts_facebookId_fkey` FOREIGN KEY (`facebookId`) REFERENCES `FacebookOAuthData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConnectedAccounts` ADD CONSTRAINT `ConnectedAccounts_instagramId_fkey` FOREIGN KEY (`instagramId`) REFERENCES `InstagramOAuthData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConnectedAccounts` ADD CONSTRAINT `ConnectedAccounts_linkedinId_fkey` FOREIGN KEY (`linkedinId`) REFERENCES `LinkedInOAuthData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConnectedAccounts` ADD CONSTRAINT `ConnectedAccounts_twitterId_fkey` FOREIGN KEY (`twitterId`) REFERENCES `TwitterOAuthData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConnectedAccounts` ADD CONSTRAINT `ConnectedAccounts_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfileSubscription` ADD CONSTRAINT `FK_UserProfile_Subscription` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadPreferences` ADD CONSTRAINT `LeadPreferences_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedSearch` ADD CONSTRAINT `SavedSearch_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Integration` ADD CONSTRAINT `Integration_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoFactorAuth` ADD CONSTRAINT `TwoFactorAuth_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPermissions` ADD CONSTRAINT `UserPermissions_teamMemberId_fkey` FOREIGN KEY (`teamMemberId`) REFERENCES `TeamMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationPreferences` ADD CONSTRAINT `NotificationPreferences_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_notificationPreferencesId_fkey` FOREIGN KEY (`notificationPreferencesId`) REFERENCES `NotificationPreferences`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_twoFactorAuthId_fkey` FOREIGN KEY (`twoFactorAuthId`) REFERENCES `TwoFactorAuth`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_taskTrackingId_fkey` FOREIGN KEY (`taskTrackingId`) REFERENCES `TaskTracking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_teamMemberId_fkey` FOREIGN KEY (`teamMemberId`) REFERENCES `TeamMember`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskActivity` ADD CONSTRAINT `TaskActivity_taskTrackingId_fkey` FOREIGN KEY (`taskTrackingId`) REFERENCES `TaskTracking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecuritySettings` ADD CONSTRAINT `SecuritySettings_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyInfo` ADD CONSTRAINT `CompanyInfo_companyCampaignsUserProfileId_fkey` FOREIGN KEY (`companyCampaignsUserProfileId`) REFERENCES `CompanyCampaignsUserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyInfo` ADD CONSTRAINT `CompanyInfo_kanbanStateId_fkey` FOREIGN KEY (`kanbanStateId`) REFERENCES `KanbanState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyInfo` ADD CONSTRAINT `CompanyInfo_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyCampaignsUserProfile` ADD CONSTRAINT `CompanyCampaignsUserProfile_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignAnalytics` ADD CONSTRAINT `CampaignAnalytics_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignAnalytics` ADD CONSTRAINT `CampaignAnalytics_companyInfoId_fkey` FOREIGN KEY (`companyInfoId`) REFERENCES `CompanyInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadTypeGlobal` ADD CONSTRAINT `LeadTypeGlobal_companyInfoId_fkey` FOREIGN KEY (`companyInfoId`) REFERENCES `CompanyInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadTypeGlobal` ADD CONSTRAINT `LeadTypeGlobal_leadListId_fkey` FOREIGN KEY (`leadListId`) REFERENCES `LeadList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialLinks` ADD CONSTRAINT `SocialLinks_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `LeadTypeGlobal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadList` ADD CONSTRAINT `LeadList_socialsCountId_fkey` FOREIGN KEY (`socialsCountId`) REFERENCES `SocialsCount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadList` ADD CONSTRAINT `LeadList_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadList` ADD CONSTRAINT `LeadList_companyInfoId_fkey` FOREIGN KEY (`companyInfoId`) REFERENCES `CompanyInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KanbanState` ADD CONSTRAINT `KanbanState_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KanbanTask` ADD CONSTRAINT `KanbanTask_kanbanStateId_fkey` FOREIGN KEY (`kanbanStateId`) REFERENCES `KanbanState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KanbanColumn` ADD CONSTRAINT `KanbanColumn_kanbanStateId_fkey` FOREIGN KEY (`kanbanStateId`) REFERENCES `KanbanState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TextCampaign` ADD CONSTRAINT `TextCampaign_companyCampaignsUserProfileId_fkey` FOREIGN KEY (`companyCampaignsUserProfileId`) REFERENCES `CompanyCampaignsUserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailCampaign` ADD CONSTRAINT `EmailCampaign_companyCampaignsUserProfileId_fkey` FOREIGN KEY (`companyCampaignsUserProfileId`) REFERENCES `CompanyCampaignsUserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMediaCampaign` ADD CONSTRAINT `SocialMediaCampaign_companyCampaignsUserProfileId_fkey` FOREIGN KEY (`companyCampaignsUserProfileId`) REFERENCES `CompanyCampaignsUserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CallCampaign` ADD CONSTRAINT `CallCampaign_companyCampaignsUserProfileId_fkey` FOREIGN KEY (`companyCampaignsUserProfileId`) REFERENCES `CompanyCampaignsUserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AIKnowledgebase` ADD CONSTRAINT `AIKnowledgebase_recordingId_fkey` FOREIGN KEY (`recordingId`) REFERENCES `Recording`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AIKnowledgebase` ADD CONSTRAINT `AIKnowledgebase_aIAvatarId_fkey` FOREIGN KEY (`aIAvatarId`) REFERENCES `AIAvatar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AIKnowledgebase` ADD CONSTRAINT `AIKnowledgebase_backgroundId_fkey` FOREIGN KEY (`backgroundId`) REFERENCES `Background`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AIKnowledgebase` ADD CONSTRAINT `AIKnowledgebase_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillingHistoryItem` ADD CONSTRAINT `BillingHistoryItem_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentDetails` ADD CONSTRAINT `PaymentDetails_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AICredits` ADD CONSTRAINT `AICredits_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `UserProfileSubscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadCredits` ADD CONSTRAINT `LeadCredits_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `UserProfileSubscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkipTraceCredits` ADD CONSTRAINT `SkipTraceCredits_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `UserProfileSubscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recording` ADD CONSTRAINT `Recording_voiceCloneId_fkey` FOREIGN KEY (`voiceCloneId`) REFERENCES `VoiceClone`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AIAvatar` ADD CONSTRAINT `AIAvatar_videoDetailsId_fkey` FOREIGN KEY (`videoDetailsId`) REFERENCES `VideoDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Background` ADD CONSTRAINT `Background_colorSchemeId_fkey` FOREIGN KEY (`colorSchemeId`) REFERENCES `ColorScheme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
