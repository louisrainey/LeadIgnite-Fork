import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Adjust the path as needed

// Function to create an email campaign
async function createEmailCampaign(data: any) {
  const campaign = await prisma.emailCampaign.create({
    data: {
      senderEmail: data.senderEmail,
      recipientCount: data.recipientCount,
      sentCount: 0, // Initially, no emails are sent
      deliveredCount: 0, // Initially, no emails are delivered
      companyCampaignsUserProfileId: data.companyCampaignsUserProfileId
    }
  });

  console.log('Email campaign created:', campaign);
  return campaign;
}

// API route handler for creating an email campaign
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { senderEmail, recipientCount, companyCampaignsUserProfileId } =
    req.body;

  // Basic validation for required fields
  if (!senderEmail || !recipientCount || !companyCampaignsUserProfileId) {
    return res.status(400).json({
      error:
        'senderEmail, recipientCount, and companyCampaignsUserProfileId are required'
    });
  }

  try {
    // Call the createEmailCampaign function
    const campaign = await createEmailCampaign({
      senderEmail,
      recipientCount,
      companyCampaignsUserProfileId
    });

    // Return the created campaign as the response
    return res.status(200).json({
      message: 'Email campaign created successfully',
      campaign
    });
  } catch (error) {
    console.error('Error creating email campaign:', error);
    return res.status(500).json({ error: 'Failed to create email campaign' });
  }
}
