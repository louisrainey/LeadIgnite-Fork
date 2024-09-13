import {
  CallCampaign,
  SocialAction,
  SocialMediaCampaign
} from '@/types/_dashboard/campaign';
import {
  EmailCampaign,
  GetEmailByIdResponse
} from '@/types/goHighLevel/conversations';
import { TextMessage } from '@/types/goHighLevel/text';
import { GetCallResponse } from '@/types/vapiAi/api/calls/get';
import ExcelJS from 'exceljs';

export async function exportEmailCampaignBulkToExcel(
  sheetName: string,
  columns: {
    header: string;
    accessorKey: keyof GetEmailByIdResponse;
  }[],
  emails: GetEmailByIdResponse[], // Now this accepts an array of GetEmailByIdResponse
  filename: string
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey as string,
    width: 30
  }));

  // Iterate over the emails array and add each email as a row
  emails.forEach((email) => {
    const rowData = columns.reduce(
      (rowObj, col) => {
        rowObj[col.accessorKey as string] = email[col.accessorKey] || '';
        return rowObj;
      },
      {} as Record<string, any>
    );

    worksheet.addRow(rowData); // Add each email as a row in the sheet
  });

  // Return Uint8Array instead of Buffer
  return workbook.xlsx.writeBuffer() as Promise<Uint8Array>;
}

// Export campaign messages to Excel
export async function exportCampaignMessagesBulkToExcel(
  sheetName: string,
  columns: { header: string; accessorKey: keyof TextMessage }[],
  messages: TextMessage[],
  filename: string
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey as string,
    width: 30
  }));

  messages.forEach((message) => {
    const rowData = columns.reduce(
      (rowObj, col) => {
        rowObj[col.accessorKey as string] = message[col.accessorKey] || '';
        return rowObj;
      },
      {} as Record<string, any>
    );

    worksheet.addRow(rowData);
  });

  // Return Uint8Array
  return workbook.xlsx.writeBuffer() as Promise<Uint8Array>;
}

// Export social campaign data to Excel

export async function exportSocialTableBulkToExcel(
  sheetName: string,
  campaignType: 'text' | 'email' | 'social' | 'call',
  columns: { header: string; accessorKey: string }[],
  data: SocialMediaCampaign[],
  filename: string
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Add column headers
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey
  }));

  // Process each campaign and create a separate row for each action
  data.forEach((campaign) => {
    campaign.actions.forEach((action: SocialAction) => {
      // Create a row for each action in the campaign
      const rowData = columns.reduce(
        (acc, col) => {
          if (col.accessorKey === 'actions') {
            // Handle the actions column (only the current action for this row)
            acc[col.accessorKey] = `${action.type} (Attempts: ${
              action.attempt
            }, Successes: ${action.successful}, Failures: ${
              action.failed
            }, Status: ${action.status}, View: ${action.viewLink || 'N/A'})`;
          } else if (campaign[col.accessorKey as keyof SocialMediaCampaign]) {
            // Handle all other columns by pulling from the campaign object
            acc[col.accessorKey] =
              campaign[col.accessorKey as keyof SocialMediaCampaign] || '';
          }
          return acc;
        },
        {} as Record<string, any>
      );

      worksheet.addRow(rowData); // Add a new row for the current action
    });
  });

  // Auto-resize columns based on content
  worksheet.columns.forEach((column) => {
    if (column.values) {
      column.width = Math.max(
        ...column.values
          .filter((val) => val !== undefined && val !== null)
          .map((val) => val!.toString().length)
      );
    }
  });

  // Return Uint8Array for zip creation
  return workbook.xlsx.writeBuffer() as Promise<Uint8Array>;
}

export async function exportCallCampaignsToExcel(
  sheetName: string,
  campaignType: 'text' | 'email' | 'social' | 'call', // The campaign type
  columns: { header: string; accessorKey: string }[], // Columns for Excel export
  data: CallCampaign[], // Call campaign data
  filename: string // The output file name
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const campaignName =
    data.length > 0 ? data[0].name.replace(/\s+/g, '_') : 'Unnamed_Campaign';

  // Get today's date in dd/mm/yyyy format
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const yyyy = today.getFullYear();
  const formattedDate = `${dd}_${mm}_${yyyy}`; // Use underscores for filename compatibility

  // Modify the worksheet name to include the campaign name
  const worksheet = workbook.addWorksheet(
    `${sheetName}_${campaignName}_${formattedDate}`
  );

  // Add column headers
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey
  }));

  // Process each call campaign and create rows for each call response
  data.forEach((campaign) => {
    campaign.vapi.forEach((callResponse: GetCallResponse) => {
      const rowData = columns.reduce(
        (acc, col) => {
          if (col.accessorKey === 'status') {
            // Get the campaign status from the main campaign object, not the individual call
            acc[col.accessorKey] = campaign.status || 'No Status';
          } else if (col.accessorKey === 'createdAt') {
            acc[col.accessorKey] = new Date(
              callResponse.createdAt
            ).toLocaleString();
          } else if (col.accessorKey === 'updatedAt') {
            acc[col.accessorKey] = new Date(
              callResponse.updatedAt
            ).toLocaleString();
          } else if (col.accessorKey === 'startedAt') {
            acc[col.accessorKey] = callResponse.startedAt
              ? new Date(callResponse.startedAt).toLocaleString()
              : 'N/A';
          } else if (col.accessorKey === 'endedAt') {
            acc[col.accessorKey] = callResponse.endedAt
              ? new Date(callResponse.endedAt).toLocaleString()
              : 'N/A';
          } else if (col.accessorKey === 'costBreakdown.total') {
            acc[col.accessorKey] = `$${callResponse.costBreakdown.total.toFixed(
              2
            )}`;
          } else if (col.accessorKey === 'phoneCallProvider') {
            acc[col.accessorKey] = callResponse.phoneCallProvider;
          } else if (col.accessorKey === 'transcript') {
            // Get the actual transcript text if available, else return 'No Transcript'
            acc[col.accessorKey] = callResponse.transcript || 'No Transcript';
          } else if (col.accessorKey === 'recordingUrl') {
            // Get the actual recording URL if available, else return 'No Recording'
            acc[col.accessorKey] = callResponse.recordingUrl
              ? callResponse.recordingUrl
              : 'No Recording';
          } else {
            // Handle additional fields from the campaign object itself
            acc[col.accessorKey] =
              campaign[col.accessorKey as keyof CallCampaign] || '';
          }
          return acc;
        },
        {} as Record<string, any>
      );

      worksheet.addRow(rowData); // Add the row for the current call response
    });
  });

  // Auto-resize columns based on content
  worksheet.columns.forEach((column) => {
    if (column.values) {
      column.width = Math.max(
        ...column.values
          .filter((val) => val !== undefined && val !== null)
          .map((val) => val!.toString().length)
      );
    }
  });

  // Create and return the Excel buffer for download
  return workbook.xlsx.writeBuffer() as Promise<Uint8Array>;
}
