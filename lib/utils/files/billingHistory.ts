import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

// Define the BillingHistoryItem interface
interface BillingHistoryItem {
  invoice: string;
  amount: string;
  date: string;
  status: string;
}

// Function to download billing history as an Excel file
export const downloadBillingHistoryAsXlsx = async (
  billingHistory: BillingHistoryItem[]
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Billing History');

  // Add a title row
  worksheet.addRow(['Billing History']);

  // Add the header row
  worksheet.addRow(['Invoice', 'Amount', 'Date', 'Status']);

  // Add billing history data
  billingHistory.forEach((entry: BillingHistoryItem) => {
    worksheet.addRow([entry.invoice, entry.amount, entry.date, entry.status]);
  });

  // Adjust column widths
  worksheet.columns = [
    { key: 'invoice', width: 30 },
    { key: 'amount', width: 15 },
    { key: 'date', width: 20 },
    { key: 'status', width: 15 }
  ];

  // Create a buffer from the workbook
  const buffer = await workbook.xlsx.writeBuffer();

  // Trigger a download using the `file-saver` library
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, 'billing_history.xlsx');
};
