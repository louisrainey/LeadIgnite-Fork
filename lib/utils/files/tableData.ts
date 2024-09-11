import ExcelJS from 'exceljs';
import { TextMessageCampaign, TextMessage } from '@/types/goHighLevel/text';
import { saveAs } from 'file-saver'; // Import the saveAs function
import { GetEmailByIdResponse } from '@/types/goHighLevel/conversations';
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

// Excel export function to export the emails inside a campaign
export async function exportEmailCampaignToExcel(
  sheetName: string,
  columns: { header: string; accessorKey: keyof GetEmailByIdResponse }[], // Ensure accessorKey is keyof GetEmailByIdResponse
  emails: GetEmailByIdResponse[], // Array of emails
  filename: string
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Log the incoming data for validation
  console.log('Emails to export:', emails);

  // Check if emails array is empty or undefined
  if (!emails || emails.length === 0) {
    console.error('No emails found to export.');
    return;
  }

  // Add headers to the worksheet (columns)
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.accessorKey as string, // Ensure the key is treated as a string in ExcelJS
    width: 30 // Adjust column width as needed
  }));

  // Log the worksheet columns to ensure headers are set correctly
  console.log('Worksheet columns:', worksheet.columns);

  // Add each email as a row
  emails.forEach((email, index) => {
    const rowData = columns.reduce(
      (rowObj, col) => {
        // Handle the attachments array by joining it into a string
        if (col.accessorKey === 'attachments') {
          rowObj[col.accessorKey as string] = email.attachments?.length
            ? email.attachments.join(', ')
            : 'No Attachments';
        } else if (
          col.accessorKey === 'to' ||
          col.accessorKey === 'cc' ||
          col.accessorKey === 'bcc'
        ) {
          // Convert the recipient arrays to comma-separated strings
          rowObj[col.accessorKey as string] =
            email[col.accessorKey]?.join(', ') || 'None';
        } else {
          // For other properties, safely access the data
          rowObj[col.accessorKey as string] = email[col.accessorKey] || '';
        }
        return rowObj;
      },
      {} as Record<string, any>
    );

    // Log each row before adding it to the worksheet
    console.log(`Row ${index + 1}:`, rowData);

    // Check if rowData is complete and add to the worksheet
    if (Object.values(rowData).length > 0) {
      worksheet.addRow(rowData);
    }
  });

  // Log the final worksheet rows to ensure rows were added correctly
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    console.log(`Row ${rowNumber}:`, row.values);
  });

  // Auto-size columns based on content length
  worksheet.columns.forEach((column) => {
    if (!column || !column.eachCell) {
      // Skip the column if it's undefined or doesn't have the eachCell method
      return;
    }

    let maxLength = 10; // Set a default column width
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? String(cell.value) : '';
      maxLength = Math.max(maxLength, cellValue.length);
    });

    column.width = maxLength + 2; // Add some padding to the width
  });

  // Generate Excel file as buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Use FileSaver to save the file on the client side
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, filename);
}
