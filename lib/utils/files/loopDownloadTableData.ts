import { SocialAction, SocialMediaCampaign } from '@/types/_dashboard/campaign';
import {
  EmailCampaign,
  GetEmailByIdResponse
} from '@/types/goHighLevel/conversations';
import { TextMessage } from '@/types/goHighLevel/text';
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
