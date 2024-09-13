import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { GetEmailByIdResponse } from '@/types/goHighLevel/conversations';
import { TextMessage, TextMessageCampaign } from '@/types/goHighLevel/text';
import { SocialMediaCampaign } from '@/types/_dashboard/campaign';
import {
  exportEmailCampaignBulkToExcel,
  exportCampaignMessagesBulkToExcel,
  exportSocialTableBulkToExcel
} from './loopDownloadTableData';

// Email campaign columns
const emailColumns: {
  header: string;
  accessorKey: keyof GetEmailByIdResponse;
}[] = [
  { header: 'Email ID', accessorKey: 'id' },
  { header: 'Subject', accessorKey: 'subject' },
  { header: 'Body', accessorKey: 'body' },
  { header: 'From', accessorKey: 'from' },
  { header: 'To', accessorKey: 'to' },
  { header: 'CC', accessorKey: 'cc' },
  { header: 'BCC', accessorKey: 'bcc' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Attachments', accessorKey: 'attachments' },
  { header: 'Date Added', accessorKey: 'dateAdded' }
];

// Text message columns
const textMessageColumns: { header: string; accessorKey: keyof TextMessage }[] =
  [
    { header: 'Message ID', accessorKey: 'id' },
    { header: 'Body', accessorKey: 'body' },
    { header: 'Attachments', accessorKey: 'attachments' },
    { header: 'Type', accessorKey: 'messageType' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Direction', accessorKey: 'direction' },
    { header: 'Date Added', accessorKey: 'dateAdded' }
  ];

// Social media campaign columns
const socialColumns = [
  { header: 'Campaign Name', accessorKey: 'name' },
  { header: 'Platform', accessorKey: 'platform' },
  { header: 'Sender Handle', accessorKey: 'senderHandle' },
  { header: 'Start Date', accessorKey: 'startDate' },
  { header: 'End Date', accessorKey: 'endDate' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Actions', accessorKey: 'actions' }
];

// Function to export all campaign types into a ZIP
export async function exportAllCampaignsToZip(
  emailCampaigns: GetEmailByIdResponse[],
  textCampaigns: TextMessageCampaign[],
  socialCampaigns: SocialMediaCampaign[],
  callCampaigns: any[] // Assuming call campaigns also exist, if needed
) {
  const zip = new JSZip();

  // Helper function to add files to the ZIP
  const addToZip = async (
    campaignType: 'email' | 'text' | 'social',
    filename: string,
    data: any[],
    columns: any[]
  ) => {
    let buffer: Uint8Array | undefined;
    switch (campaignType) {
      case 'email':
        buffer = await exportEmailCampaignBulkToExcel(
          'Email Campaigns',
          columns,
          data,
          filename
        );
        break;
      case 'text':
        buffer = await exportCampaignMessagesBulkToExcel(
          'Text Campaigns',
          columns,
          data,
          filename
        );
        break;
      case 'social':
        buffer = await exportSocialTableBulkToExcel(
          'Social Campaigns',
          campaignType,
          columns,
          data,
          filename
        );
        break;
    }
    if (buffer) {
      zip.file(filename, buffer); // Add buffer to the ZIP
    }
  };

  // Export email campaigns and add to ZIP
  if (emailCampaigns.length > 0) {
    await addToZip(
      'email',
      'Email_Campaigns.xlsx',
      emailCampaigns,
      emailColumns
    );
  }

  // Export text campaigns and add to ZIP
  if (textCampaigns.length > 0) {
    // For each text campaign, export the messages
    for (const campaign of textCampaigns) {
      await addToZip(
        'text',
        `${campaign.name}_Text_Campaign.xlsx`,
        campaign.messages,
        textMessageColumns
      );
    }
  }

  // Export social campaigns and add to ZIP
  if (socialCampaigns.length > 0) {
    await addToZip(
      'social',
      'Social_Campaigns.xlsx',
      socialCampaigns,
      socialColumns
    );
  }

  // If you want to export call campaigns, you can do it similarly:
  // if (callCampaigns.length > 0) {
  //   await addToZip('call', 'Call_Campaigns.xlsx', callCampaigns, callColumns);
  // }

  // Generate ZIP and download
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'Campaigns_Export.zip');
}
