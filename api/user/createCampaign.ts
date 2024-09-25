import prisma from '../../lib/prisma'; // Adjust the path as needed
async function createEmailCampaign(data: any) {
  const campaign = await prisma.emailCampaign.create({
    data: {
      senderEmail: data.senderEmail,
      recipientCount: data.recipientCount,
      sentCount: 0,
      deliveredCount: 0,
      companyCampaignsUserProfileId: data.companyCampaignsUserProfileId
    }
  });

  console.log('Email campaign created:', campaign);
  return campaign;
}
