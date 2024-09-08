import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'; // Import ShadCN UI Table components
import {
  TextCampaign,
  CallCampaign,
  SocialMediaCampaign,
  EmailCampaign,
  CampaignType
} from '@/types/dashboard/campaign';

interface CampaignsTableProps {
  campaigns: Array<
    TextCampaign | CallCampaign | SocialMediaCampaign | EmailCampaign
  >;
  campaignType: CampaignType;
}

// Helper function to generate headers dynamically
const getHeadersByType = (campaignType: CampaignType) => {
  switch (campaignType) {
    case 'text':
      return ['Phone Number', 'Message', 'Sent At', 'Status', 'Start Date'];
    case 'call':
      return [
        'Calls',
        'In Queue',
        'Leads',
        'Voicemail',
        'Hung Up',
        'Dead',
        'Wrong #',
        'Inactive #',
        'DNC',
        'Status',
        'Start Date'
      ];
    case 'dm':
      return [
        'Platform',
        'Sender',
        'Receiver',
        'Message',
        'Sent At',
        'Status',
        'Start Date'
      ];
    case 'email':
      return [
        'From',
        'To',
        'Subject',
        'Body',
        'Sent At',
        'Status',
        'Start Date'
      ];
    default:
      return [];
  }
};

// Helper function to render table cells dynamically
const renderTableRowCells = (
  campaign: TextCampaign | CallCampaign | SocialMediaCampaign | EmailCampaign,
  campaignType: CampaignType
) => {
  switch (campaignType) {
    case 'text':
      const textCampaign = campaign as TextCampaign;
      return (
        <>
          <TableCell className="p-2 text-center">
            {textCampaign.phoneNumber}
          </TableCell>
          <TableCell className="p-2 text-center">
            {textCampaign.message}
          </TableCell>
          <TableCell className="p-2 text-center">
            {textCampaign.sentAt.toLocaleString()}
          </TableCell>
          <TableCell className="p-2 text-center">
            {textCampaign.status}
          </TableCell>
          <TableCell className="p-2 text-center">
            {textCampaign.startDate}
          </TableCell>
        </>
      );
    case 'call':
      const callCampaign = campaign as CallCampaign;
      return (
        <>
          <TableCell className="p-2 text-center">
            {callCampaign.calls}
          </TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.inQueue}
          </TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.leads}
          </TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.voicemail}
          </TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.hungUp}
          </TableCell>
          <TableCell className="p-2 text-center">{callCampaign.dead}</TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.wrongNumber}
          </TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.inactiveNumber}
          </TableCell>
          <TableCell className="p-2 text-center">{callCampaign.dnc}</TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.status}
          </TableCell>
          <TableCell className="p-2 text-center">
            {callCampaign.startDate}
          </TableCell>
        </>
      );
    case 'dm':
      const dmCampaign = campaign as SocialMediaCampaign;
      return (
        <>
          <TableCell className="p-2 text-center">
            {dmCampaign.platform}
          </TableCell>
          <TableCell className="p-2 text-center">
            {dmCampaign.senderHandle}
          </TableCell>
          <TableCell className="p-2 text-center">
            {dmCampaign.receiverHandle}
          </TableCell>
          <TableCell className="p-2 text-center">
            {dmCampaign.platform}
          </TableCell>
          <TableCell className="p-2 text-center">
            {dmCampaign.sentAt.toLocaleString()}
          </TableCell>
          <TableCell className="p-2 text-center">{dmCampaign.status}</TableCell>
          <TableCell className="p-2 text-center">
            {dmCampaign.startDate}
          </TableCell>
        </>
      );
    case 'email':
      const emailCampaign = campaign as EmailCampaign;
      return (
        <>
          <TableCell className="p-2 text-center">
            {emailCampaign.fromEmail}
          </TableCell>
          <TableCell className="p-2 text-center">
            {emailCampaign.toEmail}
          </TableCell>
          <TableCell className="p-2 text-center">
            {emailCampaign.subject}
          </TableCell>
          <TableCell className="p-2 text-center">
            {emailCampaign.body}
          </TableCell>
          <TableCell className="p-2 text-center">
            {emailCampaign.sentAt.toLocaleString()}
          </TableCell>
          <TableCell className="p-2 text-center">
            {emailCampaign.status}
          </TableCell>
          <TableCell className="p-2 text-center">
            {emailCampaign.startDate}
          </TableCell>
        </>
      );
    default:
      return null;
  }
};

const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaigns,
  campaignType
}) => {
  const headers = getHeadersByType(campaignType);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full table-auto bg-white dark:bg-gray-900">
        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            {headers.map((header, index) => (
              <TableHead key={index} className="p-2 text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {campaigns.map((campaign, index) => (
            <TableRow key={index} className="border-t dark:border-gray-700">
              {renderTableRowCells(campaign, campaignType)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignsTable;
