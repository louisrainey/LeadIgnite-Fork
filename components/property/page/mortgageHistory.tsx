import React from 'react';

interface MortgageHistoryProps {
  mortgages: Array<{
    loan_position: string;
    recording_date: string;
    loan_amount: string;
    est_rate: string;
    document_number: string;
    deed_type: string;
    lender_name: string;
    lender_type: string;
    grantee_names: string;
    loan_type: string;
  }>;
}

export const MortgageHistoryTable: React.FC<MortgageHistoryProps> = ({
  mortgages
}) => {
  return (
    <div className="w-full">
      <h3 className="mb-4 text-center text-lg font-semibold dark:text-white">
        Mortgage History
      </h3>
      <div className="mx-auto max-w-[800px] overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <tbody>
            {mortgages.map((mortgage, idx) => (
              <React.Fragment key={idx}>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Loan Position</th>
                  <td className="px-4 py-2">{mortgage.loan_position}</td>
                  <th className="px-4 py-2 font-semibold">Recording Date</th>
                  <td className="px-4 py-2">{mortgage.recording_date}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Loan Amount</th>
                  <td className="px-4 py-2">{mortgage.loan_amount}</td>
                  <th className="px-4 py-2 font-semibold">Est. Rate</th>
                  <td className="px-4 py-2">{mortgage.est_rate || '-'}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Document Number</th>
                  <td className="px-4 py-2">{mortgage.document_number}</td>
                  <th className="px-4 py-2 font-semibold">Deed Type</th>
                  <td className="px-4 py-2">{mortgage.deed_type}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Lender Name</th>
                  <td className="px-4 py-2">{mortgage.lender_name}</td>
                  <th className="px-4 py-2 font-semibold">Lender Type</th>
                  <td className="px-4 py-2">{mortgage.lender_type}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Grantee Name(s)</th>
                  <td className="px-4 py-2">{mortgage.grantee_names}</td>
                  <th className="px-4 py-2 font-semibold">Loan Type</th>
                  <td className="px-4 py-2">{mortgage.loan_type}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface SaleHistoryProps {
  sales: Array<{
    date_of_sale: string;
    amount: string;
    purchase_method: string;
    document_type: string;
    transaction_type: string;
    seller_names: string;
    buyer_names: string;
  }>;
}

export const SaleHistoryTable: React.FC<SaleHistoryProps> = ({ sales }) => {
  return (
    <div className="mt-6 w-full">
      <h3 className="mb-4 text-center text-lg font-semibold dark:text-white">
        Sale History
      </h3>
      <div className="mx-auto max-w-[800px] overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <tbody>
            {sales.map((sale, idx) => (
              <React.Fragment key={idx}>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Date of Sale</th>
                  <td className="px-4 py-2">{sale.date_of_sale}</td>
                  <th className="px-4 py-2 font-semibold">Amount</th>
                  <td className="px-4 py-2">{sale.amount}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Purchase Method</th>
                  <td className="px-4 py-2">{sale.purchase_method}</td>
                  <th className="px-4 py-2 font-semibold">Document Type</th>
                  <td className="px-4 py-2">{sale.document_type}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Transaction Type</th>
                  <td className="px-4 py-2">{sale.transaction_type}</td>
                  <th className="px-4 py-2 font-semibold">Seller Name(s)</th>
                  <td className="px-4 py-2">{sale.seller_names}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-4 py-2 font-semibold">Buyer Name(s)</th>
                  <td className="px-4 py-2">{sale.buyer_names}</td>
                  {/* Empty cells for proper 4-column layout */}
                  <th className="px-4 py-2"></th>
                  <td className="px-4 py-2"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
