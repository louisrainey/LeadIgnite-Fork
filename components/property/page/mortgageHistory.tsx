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
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Mortgage History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-left dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border px-4 py-2 dark:border-gray-700">
                Loan Position
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Recording Date
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Loan Amount
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Est. Rate
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Document Number
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Deed Type
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Lender Name
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Lender Type
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Grantee Names
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Loan Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {mortgages.map((mortgage, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.loan_position}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.recording_date}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.loan_amount}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.est_rate}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.document_number}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.deed_type}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.lender_name}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.lender_type}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.grantee_names}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {mortgage.loan_type}
                </td>
              </tr>
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
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Sale History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-left dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border px-4 py-2 dark:border-gray-700">
                Date of Sale
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">Amount</th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Purchase Method
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Document Type
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Transaction Type
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Seller Names
              </th>
              <th className="border px-4 py-2 dark:border-gray-700">
                Buyer Names
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {sales.map((sale, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.date_of_sale}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.amount}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.purchase_method}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.document_type}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.transaction_type}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.seller_names}
                </td>
                <td className="border px-4 py-2 dark:border-gray-700">
                  {sale.buyer_names}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
