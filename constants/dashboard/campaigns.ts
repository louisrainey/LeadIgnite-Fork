import {
  TextCampaign,
  CallCampaign,
  SocialMediaCampaign,
  SocialAction
} from '@/types/_dashboard/campaign';

// Social media actions dataset
export const exampleSocialMediaActions: {
  instagram: SocialAction[];
  linkedin: SocialAction[];
  twitter: SocialAction[];
} = {
  instagram: [
    {
      type: 'Comment',
      status: 'pending',
      attempt: 1,
      successful: 0,
      failed: 0
    },
    {
      type: 'Like',
      status: 'successful',
      attempt: 1,
      successful: 1,
      failed: 0
    },
    {
      type: '👁️ Story',
      status: 'pending',
      attempt: 2,
      successful: 0,
      failed: 0
    },
    { type: 'Follow', status: 'failed', attempt: 1, successful: 0, failed: 1 }
  ],
  linkedin: [
    {
      type: '📩 Connections',
      status: 'successful',
      attempt: 5,
      successful: 5,
      failed: 0,
      replyMessage: 'Thanks for connecting!',
      viewLink: 'https://linkedin.com/message/123'
    },
    {
      type: 'Comment',
      status: 'pending',
      attempt: 2,
      successful: 0,
      failed: 0
    },
    {
      type: 'Follow',
      status: 'successful',
      attempt: 3,
      successful: 3,
      failed: 0
    },
    {
      type: 'Like',
      status: 'successful',
      attempt: 4,
      successful: 4,
      failed: 0
    },
    {
      type: '📩 Groups',
      status: 'failed',
      attempt: 2,
      successful: 0,
      failed: 2
    },
    {
      type: 'Connect + Follow Up',
      status: 'pending',
      attempt: 3,
      successful: 0,
      failed: 0
    },
    {
      type: 'Invite to follow',
      status: 'successful',
      attempt: 2,
      successful: 2,
      failed: 0
    }
  ],
  twitter: [
    {
      type: '📩 Followers',
      status: 'successful',
      attempt: 3,
      successful: 3,
      failed: 0,
      replyMessage: 'Thank you for following!',
      viewLink: 'https://twitter.com/message/456'
    },
    { type: 'Follow', status: 'pending', attempt: 1, successful: 0, failed: 0 },
    { type: 'Like', status: 'successful', attempt: 2, successful: 2, failed: 0 }
  ]
};

export const exampleCampaignsData = {
  textMessages: [
    {
      id: '1',
      name: 'Text Reminder Campaign',
      phoneNumber: '+1234567890',
      message: 'Hello, this is a reminder for your appointment.',
      sentAt: new Date('2024-01-18T14:48:00'),
      status: 'delivered',
      startDate: '2024-01-18'
    },
    {
      id: '2',
      name: 'Delivery Update Campaign',
      phoneNumber: '+1987654321',
      message: 'Your order is out for delivery!',
      sentAt: new Date('2024-01-18T12:30:00'),
      status: 'pending',
      startDate: '2024-01-18'
    }
  ] as TextCampaign[],

  calls: [
    {
      id: '1',
      name: 'Outbound Call Campaign',
      callerNumber: '+1234567890',
      receiverNumber: '+0987654321',
      duration: 300,
      callType: 'outbound',
      status: 'completed',
      timestamp: new Date('2024-01-18T09:30:00'),
      startDate: '2024-01-18',

      // New attributes
      calls: 150,
      inQueue: 10,
      leads: 5,
      voicemail: 50,
      hungUp: 20,
      dead: 15,
      wrongNumber: 7,
      inactiveNumber: 4,
      dnc: 1
    },
    {
      id: '2',
      name: 'Inbound Call Campaign',
      callerNumber: '+1234567890',
      receiverNumber: '+0987654321',
      duration: 0,
      callType: 'inbound',
      status: 'missed',
      timestamp: new Date('2024-01-18T15:00:00'),
      startDate: '2024-01-18',

      // New attributes
      calls: 80,
      inQueue: 5,
      leads: 3,
      voicemail: 25,
      hungUp: 10,
      dead: 8,
      wrongNumber: 2,
      inactiveNumber: 1,
      dnc: 0
    }
  ] as CallCampaign[],

  SocialCampaigns: [
    {
      id: '1',
      name: 'Twitter Promotion Campaign',
      platform: 'Twitter',
      senderHandle: '@user123',
      hashtags: ['#promotion', '#sale'],
      status: 'completed', // Updated to match new status types
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      actions: exampleSocialMediaActions.twitter // Twitter-specific actions with individual statuses
    },
    {
      id: '2',
      name: 'Instagram Product Launch Campaign',
      platform: 'Instagram',
      senderHandle: '@client789',
      hashtags: ['#newproduct', '#launch'],
      status: 'pending', // Updated status
      startDate: '2024-01-18',
      endDate: '2024-01-20',
      actions: exampleSocialMediaActions.instagram // Instagram-specific actions with individual statuses
    },
    {
      id: '3',
      name: 'LinkedIn Networking Campaign',
      platform: 'LinkedIn',
      senderHandle: '@professional123',
      hashtags: ['#networking', '#connections'],
      status: 'pending', // Updated status
      startDate: '2024-01-18',
      endDate: '2024-01-22', // Adjusted end date for LinkedIn campaign
      actions: exampleSocialMediaActions.linkedin // LinkedIn-specific actions with individual statuses
    }
  ] as SocialMediaCampaign[], // Cast as SMCampaign array
  emails: [
    {
      id: '1',
      name: 'Order Confirmation Email Campaign',
      fromEmail: 'support@company.com',
      toEmail: 'customer@example.com',
      subject: 'Order Confirmation',
      body: 'Your order has been confirmed and will be shipped soon.',
      sentAt: new Date('2024-01-18T08:00:00'),
      status: 'sent',
      startDate: '2024-01-18'
    },
    {
      id: '2',
      name: 'Newsletter Campaign',
      fromEmail: 'newsletter@company.com',
      toEmail: 'subscriber@example.com',
      subject: 'New Arrivals',
      body: 'Check out our latest collection of products.',
      sentAt: new Date('2024-01-18T09:45:00'),
      status: 'queued',
      startDate: '2024-01-18'
    }
  ] as EmailCampaign[]
};
