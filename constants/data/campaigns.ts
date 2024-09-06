import {
  TextCampaign,
  CallCampaign,
  DMCampaign,
  EmailCampaign
} from '@/types/campaign';

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
  dms: [
    {
      id: '1',
      name: 'Twitter DM Campaign',
      platform: 'Twitter',
      senderHandle: '@user123',
      receiverHandle: '@business456',
      message: 'Hey, I have a question about your product.',
      sentAt: new Date('2024-01-18T10:15:00'),
      status: 'read',
      startDate: '2024-01-18'
    },
    {
      id: '2',
      name: 'Instagram DM Campaign',
      platform: 'Instagram',
      senderHandle: '@client789',
      receiverHandle: '@business456',
      message: 'Thanks for the update!',
      sentAt: new Date('2024-01-18T11:45:00'),
      status: 'unread',
      startDate: '2024-01-18'
    }
  ] as DMCampaign[],

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
