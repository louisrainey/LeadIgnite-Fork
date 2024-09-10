import { faker } from '@faker-js/faker';
import {
  CallStatus,
  CallType,
  EndedReason,
  GetCallResponse
} from '../vapiAi/api/calls/get';
import { CallCampaign } from '../_dashboard/campaign';
import { APP_TESTING_MODE } from '../../constants/data';

// Helper function to generate a phone number in the +1-XXX-XXX-XXXX format
const generatePhoneNumber = (): string => {
  const areaCode = faker.number.int({ min: 100, max: 999 });
  const prefix = faker.number.int({ min: 100, max: 999 });
  const lineNumber = faker.number.int({ min: 1000, max: 9999 });
  return `+1-${areaCode}-${prefix}-${lineNumber}`;
};

// Helper function to create fake call response
const generateGetCallResponse = (): GetCallResponse => {
  const callStatuses: CallStatus[] = [
    'queued',
    'ringing',
    'in-progress',
    'forwarding',
    'ended'
  ];
  const callTypes: CallType[] = [
    'inboundPhoneCall',
    'outboundPhoneCall',
    'webCall'
  ];
  const endReasons: EndedReason[] = [
    'assistant-error',
    'assistant-not-found',
    'customer-busy',
    'exceeded-max-duration',
    'manually-canceled'
  ];

  return {
    id: faker.string.uuid(), // Fix: use faker.string.uuid() for UUID
    orgId: faker.string.uuid(),
    type: faker.helpers.arrayElement(callTypes),
    phoneCallProvider: faker.helpers.arrayElement(['twilio', 'vonage', 'vapi']),
    phoneCallTransport: faker.helpers.arrayElement(['sip', 'pstn']),
    status: faker.helpers.arrayElement(callStatuses),
    endedReason: faker.helpers.maybe(
      () => faker.helpers.arrayElement(endReasons),
      { probability: 0.3 }
    ),
    messages: [], // Assuming no messages for simplicity
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    startedAt: faker.date.recent().toISOString(),
    endedAt: faker.date.recent().toISOString(),
    cost: faker.number.int({ min: 10, max: 100 }), // Fix: use faker.number.int() instead of faker.datatype.number()
    costBreakdown: {
      transport: faker.number.int({ min: 1, max: 10 }),
      stt: faker.number.int({ min: 1, max: 10 }),
      llm: faker.number.int({ min: 1, max: 10 }),
      tts: faker.number.int({ min: 1, max: 10 }),
      vapi: faker.number.int({ min: 1, max: 10 }),
      total: faker.number.int({ min: 50, max: 200 }),
      llmPromptTokens: faker.number.int({ min: 100, max: 1000 }),
      llmCompletionTokens: faker.number.int({ min: 100, max: 1000 }),
      ttsCharacters: faker.number.int({ min: 100, max: 1000 })
    },
    transcript: faker.lorem.sentence(),
    recordingUrl: faker.internet.url(),
    stereoRecordingUrl: faker.internet.url(),
    artifact: {
      videoRecordingEnabled: faker.datatype.boolean(),
      recordingS3PathPrefix: faker.system.filePath()
    },
    analysis: {
      summary: faker.lorem.sentence(),
      structuredData: {},
      successEvaluation: faker.lorem.sentence()
    },
    assistantId: faker.string.uuid(),
    assistant: undefined // Assuming assistant info is not provided
  };
};

// Helper function to create CallCampaign data
const generateCallCampaign = (): CallCampaign => {
  const callStatuses: CallCampaign['status'][] = [
    'completed',
    'missed',
    'failed'
  ];
  const callTypes: CallCampaign['callType'][] = ['inbound', 'outbound'];

  return {
    id: faker.string.uuid(), // Fix: use faker.string.uuid() for UUID
    name: ` ${faker.company.name()}`, // Fix: use faker.company.name() for company name
    goal: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(callStatuses),
    startDate: faker.date.past().toISOString(),
    endDate: faker.helpers.maybe(() => faker.date.future().toISOString(), {
      probability: 0.7
    }),
    aiVoice: faker.helpers.maybe(() => faker.person.firstName(), {
      probability: 0.3
    }), // Fix: use faker.person.firstName() for names
    aiScript: faker.lorem.paragraph(),
    aiAvatarAgent: faker.helpers.maybe(() => faker.person.firstName(), {
      probability: 0.2
    }),
    vapi: generateGetCallResponse(),
    callerNumber: generatePhoneNumber(), // Using custom generatePhoneNumber function
    receiverNumber: generatePhoneNumber(), // Using custom generatePhoneNumber function
    duration: faker.number.int({ min: 30, max: 600 }), // Call duration in seconds
    callType: faker.helpers.arrayElement(callTypes),
    timestamp: faker.date.recent(),
    calls: faker.number.int({ min: 1, max: 100 }),
    inQueue: faker.number.int({ min: 0, max: 10 }),
    leads: faker.number.int({ min: 0, max: 10 }),
    voicemail: faker.number.int({ min: 0, max: 10 }),
    hungUp: faker.number.int({ min: 0, max: 10 }),
    dead: faker.number.int({ min: 0, max: 5 }),
    wrongNumber: faker.number.int({ min: 0, max: 5 }),
    inactiveNumber: faker.number.int({ min: 0, max: 5 }),
    dnc: faker.number.int({ min: 0, max: 5 })
  };
};

// Generate 100 entries of CallCampaign data
const generateCallCampaignData = (): CallCampaign[] => {
  return Array.from({ length: 100 }, generateCallCampaign);
};

// Example of generating 100 entries
export const mockCallCampaignData =
  APP_TESTING_MODE && generateCallCampaignData();
