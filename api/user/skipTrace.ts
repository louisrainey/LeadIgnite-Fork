import prisma from '../../lib/prisma'; // Adjust the path as needed
import axios from 'axios';

// Perform Skip Trace and save results
async function performSkipTrace(leadId: string) {
  try {
    const lead = await prisma.leadTypeGlobal.findUnique({
      where: { id: leadId },
      include: {
        companyInfo: {
          include: {
            userProfile: {
              include: {
                subscription: true
              }
            }
          }
        }
      }
    });

    if (!lead) {
      throw new Error('Lead not found');
    }

    const response = await axios.post('https://api.example.com/skip-trace', {
      phone: lead.phone
    });

    const skipTraceData = response.data;

    // Save skip trace result in SkipTraceCredits
    await prisma.skipTraceCredits.update({
      where: {
        subscriptionId: lead.companyInfo.userProfile.subscription!.id
      },
      data: {
        used: { increment: 1 } // Increase the used skip traces
      }
    });

    console.log('Skip trace data:', skipTraceData);
    return skipTraceData;
  } catch (error) {
    console.error('Error performing skip trace:', error);
    throw error;
  }
}

// Call the skip trace function
performSkipTrace('some-lead-id')
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect());
