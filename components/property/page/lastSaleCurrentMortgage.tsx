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
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Date of Sale</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">
              Purchase Method
            </th>
            <th className="border border-gray-300 px-4 py-2">Document Type</th>
            <th className="border border-gray-300 px-4 py-2">
              Transaction Type
            </th>
            <th className="border border-gray-300 px-4 py-2">Seller Name(s)</th>
            <th className="border border-gray-300 px-4 py-2">Buyer Name(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              {sale.date_of_sale}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sale.amount.toLocaleString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sale.purchase_method}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sale.document_type}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sale.transaction_type}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sale.seller_names}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {sale.buyer_names}
            </td>
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
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Loan Position</th>
            <th className="border border-gray-300 px-4 py-2">Recording Date</th>
            <th className="border border-gray-300 px-4 py-2">Loan Amount</th>
            <th className="border border-gray-300 px-4 py-2">Est. Rate</th>
            <th className="border border-gray-300 px-4 py-2">
              Document Number
            </th>
            <th className="border border-gray-300 px-4 py-2">Deed Type</th>
            <th className="border border-gray-300 px-4 py-2">Lender Name</th>
            <th className="border border-gray-300 px-4 py-2">Lender Type</th>
            <th className="border border-gray-300 px-4 py-2">
              Grantee Name(s)
            </th>
            <th className="border border-gray-300 px-4 py-2">Loan Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.loan_position}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.recording_date}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.loan_amount.toLocaleString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.est_rate || '-'}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.document_number}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.deed_type}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.lender_name}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.lender_type}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.grantee_names}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {mortgage.loan_type}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
