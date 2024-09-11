import ExcelJS from 'exceljs';
import { TextMessageCampaign, TextMessage } from '@/types/goHighLevel/text';
import { saveAs } from 'file-saver'; // Import the saveAs function
// Function to export campaign data to Excel
export async function exportTableDataToExcel(
  sheetName: string,
  campaignType: 'text' | 'email' | 'social' | 'call',
  columns: { header: string; accessorKey: string }[],
  data: any[],
  filename: string
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Add column headers
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey
  }));

  // Process and add rows to the worksheet
  data.forEach((campaign) => {
    const row = columns.reduce(
      (acc, col) => {
        acc[col.accessorKey] = campaign[col.accessorKey];
        return acc;
      },
      {} as Record<string, any>
    );

    worksheet.addRow(row);
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

  // Export the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Excel export function to export the messages inside a campaign
export async function exportCampaignMessagesToExcel(
  sheetName: string,
  columns: { header: string; accessorKey: keyof TextMessage }[], // Ensure accessorKey is keyof TextMessage
  messages: TextMessage[], // Array of messages
  filename: string
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Log the initial message data to ensure it's being passed correctly
  console.log('Messages to export:', messages);

  // Add headers to the worksheet (columns)
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey, // Ensure the key matches the accessorKey in the data
    width: 30 // Adjust column width as needed
  }));

  // Log the worksheet columns to ensure headers are set correctly
  console.log('Worksheet columns:', worksheet.columns);

  // Add each message as a row
  messages.forEach((message, index) => {
    const rowData = columns.reduce(
      (rowObj, col) => {
        // Special handling for attachments array
        if (col.accessorKey === 'attachments') {
          rowObj[col.accessorKey as string] = message.attachments?.length
            ? message.attachments.join(', ')
            : 'No Attachments';
        } else {
          // For other properties, safely access the data
          rowObj[col.accessorKey as string] = message[col.accessorKey] || '';
        }
        return rowObj;
      },
      {} as Record<string, any>
    );

    // Log each row before adding it to the worksheet
    console.log(`Row ${index + 1}:`, rowData);

    worksheet.addRow(rowData);
  });

  // Generate Excel file as buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Use FileSaver to save the file on the client side
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, filename);
}
