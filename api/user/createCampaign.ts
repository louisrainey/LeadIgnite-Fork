import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Adjust the path as needed
import checkAndUpdateCredits from './_utilils/checkCredits'; // Import the credit utility function

// Function to create a campaign based on the campaign type
async function createCampaign(data: any, campaignType: string) {
  let campaign;

  switch (campaignType) {
    case 'email':
      campaign = await prisma.emailCampaign.create({
        data: {
          senderEmail: data.senderEmail,
          recipientCount: data.recipientCount,
          sentCount: 0, // Initially, no emails are sent
          deliveredCount: 0, // Initially, no emails are delivered
          companyCampaignsUserProfileId: data.companyCampaignsUserProfileId
        }
      });
      break;

    case 'text':
      campaign = await prisma.textCampaign.create({
        data: {
          phoneNumber: data.phoneNumber,
          message: data.message,
          sentAt: new Date(), // Timestamp when the text is sent
          status: 'Pending', // Status can be updated later
          companyCampaignsUserProfileId: data.companyCampaignsUserProfileId
        }
      });
      break;

    case 'social':
      campaign = await prisma.socialMediaCampaign.create({
        data: {
          platform: data.platform,
          senderHandle: data.senderHandle,
          receiverHandle: data.receiverHandle,
          hashtags: data.hashtags,
          companyCampaignsUserProfileId: data.companyCampaignsUserProfileId
        }
      });
      break;

    case 'call':
      campaign = await prisma.callCampaign.create({
        data: {
          callerNumber: data.callerNumber,
          receiverNumber: data.receiverNumber,
          duration: data.duration,
          callType: data.callType,
          companyCampaignsUserProfileId: data.companyCampaignsUserProfileId
        }
      });
      break;

    default:
      throw new Error('Invalid campaign type');
  }

  console.log(
    `${
      campaignType.charAt(0).toUpperCase() + campaignType.slice(1)
    } campaign created:`,
    campaign
  );
  return campaign;
}

// API route handler for creating different types of campaigns
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    campaignType, // Can be 'email', 'text', 'social', or 'call'
    subscriptionId, // Required for checking credits
    creditsToUse, // The number of credits to use
    ...campaignData // Spread operator to capture the rest of the campaign data
  } = req.body;

  // Basic validation for required fields
  if (!campaignType || !subscriptionId || !creditsToUse) {
    return res.status(400).json({
      error: 'campaignType, subscriptionId, and creditsToUse are required'
    });
  }

  try {
    // Step 1: Check and update credits using the utility function
    await checkAndUpdateCredits(subscriptionId, 'LeadCredits', creditsToUse);

    // Step 2: Create the campaign based on the campaignType
    const campaign = await createCampaign(campaignData, campaignType);

    // Step 3: Return the created campaign as the response
    return res.status(200).json({
      message: `${
        campaignType.charAt(0).toUpperCase() + campaignType.slice(1)
      } campaign created successfully`,
      campaign
    });
  } catch (error) {
    // Typecast error to Error to access the message
    console.error('Error creating campaign:', (error as Error).message);
    return res.status(500).json({
      error: (error as Error).message || 'Failed to create campaign'
    });
  }
}
