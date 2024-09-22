import { UserProfile } from '@/types/userProfile';

/**
 * Extracts required fields from the mock user profile object.
 * @param {UserProfile} profile - The mock user profile.
 * @returns {Partial<UserProfile>} - The extracted required fields from the user profile.
 */
export function extractRequiredFields(
  profile: UserProfile
): Partial<UserProfile> {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    country: profile.country,
    city: profile.city,
    notificationPreferences: {
      emailNotifications: profile.notificationPreferences.emailNotifications,
      smsNotifications: profile.notificationPreferences.smsNotifications,
      notifyForNewLeads: profile.notificationPreferences.notifyForNewLeads,
      notifyForCampaignUpdates:
        profile.notificationPreferences.notifyForCampaignUpdates
    },
    companyInfo: {
      companyName: profile.companyInfo.companyName,
      webhook: profile.companyInfo.webhook,
      companyLogo: profile.companyInfo.companyLogo,
      GHLID: profile.companyInfo.GHLID,
      assets: {
        logo: profile.companyInfo.assets.logo,
        favicon: profile.companyInfo.assets.favicon,
        banner: profile.companyInfo.assets.banner,
        ghlAssets: profile.companyInfo.assets.ghlAssets
      },
      forwardingNumber: profile.companyInfo.forwardingNumber,
      outreachEmail: profile.companyInfo.outreachEmail,
      explainerVideo: profile.companyInfo.explainerVideo
    },
    aIKnowledgebase: {
      emailTemplate: profile.aIKnowledgebase.emailTemplate,
      salesScript: profile.aIKnowledgebase.salesScript,
      assignedAssistantID: profile.aIKnowledgebase.assignedAssistantID,
      assignedSquadID: profile.aIKnowledgebase.assignedSquadID,
      recordings: {
        customVoiceID: profile.aIKnowledgebase.recordings.customVoiceID,
        voiceClone: {
          audioFile:
            profile.aIKnowledgebase.recordings.voiceClone?.audioFile |
            undefined,
          clonedVoiceID:
            profile.aIKnowledgebase.recordings.voiceClone?.clonedVoiceID
        },
        voicemailFile: profile.aIKnowledgebase.recordings.voicemailFile
      },
      aiAvatar: {
        avatarKandidFile: profile.aIKnowledgebase.aiAvatar?.avatarKandidFile,
        avatarMotionFile: profile.aIKnowledgebase.aiAvatar?.avatarMotionFile,
        videoDetails: {
          title: profile.aIKnowledgebase.aiAvatar?.videoDetails?.title,
          description:
            profile.aIKnowledgebase.aiAvatar?.videoDetails?.description,
          ctaText: profile.aIKnowledgebase.aiAvatar?.videoDetails?.ctaText,
          ctaLink: profile.aIKnowledgebase.aiAvatar?.videoDetails?.ctaLink
        }
      },
      background: {
        backgroundVideoFile:
          profile.aIKnowledgebase.background?.backgroundVideoFile,
        backgroundMusic: profile.aIKnowledgebase.background?.backgroundMusic,
        colorScheme: {
          primaryColor:
            profile.aIKnowledgebase.background?.colorScheme?.primaryColor,
          secondaryColor:
            profile.aIKnowledgebase.background?.colorScheme?.secondaryColor,
          accentColor:
            profile.aIKnowledgebase.background?.colorScheme?.accentColor
        }
      }
    },
    twoFactorAuth: {
      isEnabled: profile.twoFactorAuth?.isEnabled,
      methods: {
        sms: profile.twoFactorAuth?.methods.sms,
        email: profile.twoFactorAuth?.methods.email,
        authenticatorApp: profile.twoFactorAuth?.methods.authenticatorApp
      }
    }
  };
}
