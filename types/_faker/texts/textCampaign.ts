import { TextMessageCampaign } from '@/types/goHighLevel/text';
import { faker } from '@faker-js/faker';
import { generateSampleTextMessage } from './texts';
import { APP_TESTING_MODE } from '@/constants/data';

// Generate a single sample TextMessageCampaign
const generateSampleTextMessageCampaign = (): TextMessageCampaign => {
  const totalMessages = faker.number.int({ min: 50, max: 200 });
  const sentCount = faker.number.int({ min: 30, max: totalMessages });
  const deliveredCount = faker.number.int({ min: 0, max: sentCount });
  const failedCount = totalMessages - sentCount;

  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    status: faker.helpers.arrayElement([
      'pending',
      'in-progress',
      'completed',
      'failed'
    ]),
    createdAt: faker.date.past().toISOString(),
    sentCount: sentCount,
    deliveredCount: deliveredCount,
    failedCount: failedCount,
    totalMessages: totalMessages,
    lastMessageSentAt: faker.date.recent().toISOString(),
    conversationId: faker.string.uuid(),
    // Use the correct function to generate messages for the campaign
    messages: Array.from({ length: totalMessages }, () =>
      generateSampleTextMessage()
    )
  };
};

// Generate an array of sample TextMessageCampaigns
export const generateSampleTextMessageCampaigns = (
  count = 100
): TextMessageCampaign[] => {
  return Array.from({ length: count }, generateSampleTextMessageCampaign);
};

export const mockTextCampaigns =
  APP_TESTING_MODE && generateSampleTextMessageCampaigns();
