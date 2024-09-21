import React from 'react';

interface Sale {
  date_of_sale: string;
  amount: number;
  purchase_method: string;
  document_type: string;
  transaction_type: string;
  seller_names: string;
  buyer_names: string;
}

interface LastSaleProps {
  sale: Sale;
}

export const LastSaleTable: React.FC<LastSaleProps> = ({ sale }) => {
  return (
    <div className="relative mx-auto max-w-[800px] overflow-x-auto">
      <h3 className="mb-4 text-center text-lg font-semibold dark:text-white">
        Last Sale
      </h3>

      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Date of Sale
            </th>
            <td className="px-6 py-4">{sale.date_of_sale}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Amount
            </th>
            <td className="px-6 py-4">{sale.amount.toLocaleString()}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Purchase Method
            </th>
            <td className="px-6 py-4">{sale.purchase_method}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Document Type
            </th>
            <td className="px-6 py-4">{sale.document_type}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Transaction Type
            </th>
            <td className="px-6 py-4">{sale.transaction_type}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Seller Name(s)
            </th>
            <td className="px-6 py-4">{sale.seller_names}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Buyer Name(s)
            </th>
            <td className="px-6 py-4">{sale.buyer_names}</td>
            {/* Empty cells for proper 4-column layout */}
            <th className="px-6 py-4"></th>
            <td className="px-6 py-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface Mortgage {
  loan_position: string;
  recording_date: string;
  loan_amount: string;
  est_rate?: string;
  document_number: string;
  deed_type: string;
  lender_name: string;
  lender_type: string;
  grantee_names: string;
  loan_type: string;
}

interface CurrentMortgageProps {
  mortgage: Mortgage;
}

export const CurrentMortgageTable: React.FC<CurrentMortgageProps> = ({
  mortgage
}) => {
  return (
    <div className="relative mx-auto max-w-[800px] overflow-x-auto">
      <h3 className="mb-4 text-center text-lg font-semibold dark:text-white">
        Current Mortgage
      </h3>

      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Loan Position
            </th>
            <td className="px-6 py-4">{mortgage.loan_position}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Recording Date
            </th>
            <td className="px-6 py-4">{mortgage.recording_date}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Loan Amount
            </th>
            <td className="px-6 py-4">
              {mortgage.loan_amount.toLocaleString()}
            </td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Est. Rate
            </th>
            <td className="px-6 py-4">{mortgage.est_rate || '-'}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Document Number
            </th>
            <td className="px-6 py-4">{mortgage.document_number}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Deed Type
            </th>
            <td className="px-6 py-4">{mortgage.deed_type}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Lender Name
            </th>
            <td className="px-6 py-4">{mortgage.lender_name}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Lender Type
            </th>
            <td className="px-6 py-4">{mortgage.lender_type}</td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-semibold">
              Grantee Name(s)
            </th>
            <td className="px-6 py-4">{mortgage.grantee_names}</td>
            <th scope="row" className="px-6 py-4 font-semibold">
              Loan Type
            </th>
            <td className="px-6 py-4">{mortgage.loan_type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
