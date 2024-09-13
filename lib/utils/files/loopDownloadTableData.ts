import { GetEmailByIdResponse } from '@/types/goHighLevel/conversations';
import { TextMessage } from '@/types/goHighLevel/text';
import ExcelJS from 'exceljs';

// Export email campaign to Excel
export async function exportEmailCampaignBulkToExcel(
  sheetName: string,
  columns: { header: string; accessorKey: keyof GetEmailByIdResponse }[],
  emails: GetEmailByIdResponse[],
  filename: string
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey as string,
    width: 30
  }));

  emails.forEach((email) => {
    const rowData = columns.reduce(
      (rowObj, col) => {
        rowObj[col.accessorKey as string] = email[col.accessorKey] || '';
        return rowObj;
      },
      {} as Record<string, any>
    );

    worksheet.addRow(rowData);
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
  data: any[],
  filename: string
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey
  }));

  data.forEach((campaign) => {
    const rowData = columns.reduce(
      (acc, col) => {
        acc[col.accessorKey] = campaign[col.accessorKey];
        return acc;
      },
      {} as Record<string, any>
    );

    worksheet.addRow(rowData);
  });

  // Return Uint8Array
  return workbook.xlsx.writeBuffer() as Promise<Uint8Array>;
}
