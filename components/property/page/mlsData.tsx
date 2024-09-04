import React from 'react';

interface MLSData {
  mls: string;
  mls_id: string;
  list_date: string;
  list_price: number;
  sold_price: number;
  status: string;
  property_url: string;
}

interface MLSTableProps {
  mlsData: MLSData;
}

const MLSTableComponent: React.FC<MLSTableProps> = ({ mlsData }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">MLS Information</h2>
      <table className="w-full table-auto text-left">
        <tbody>
          <tr className="border-b">
            <td className="font-semibold">MLS:</td>
            <td>{mlsData.mls || 'N/A'}</td>
          </tr>
          <tr className="border-b">
            <td className="font-semibold">MLS ID:</td>
            <td>{mlsData.mls_id || 'N/A'}</td>
          </tr>
          <tr className="border-b">
            <td className="font-semibold">List Date:</td>
            <td>{mlsData.list_date || 'N/A'}</td>
          </tr>
          <tr className="border-b">
            <td className="font-semibold">List Price:</td>
            <td>
              {mlsData.list_price
                ? `$${mlsData.list_price.toLocaleString()}`
                : 'N/A'}
            </td>
          </tr>
          <tr className="border-b">
            <td className="font-semibold">Sold Price:</td>
            <td>
              {mlsData.sold_price
                ? `$${mlsData.sold_price.toLocaleString()}`
                : 'N/A'}
            </td>
          </tr>
          <tr className="border-b">
            <td className="font-semibold">Status:</td>
            <td>{mlsData.status || 'N/A'}</td>
          </tr>
          <tr className="border-b">
            <td className="font-semibold">Property URL:</td>
            <td>
              <a
                href={mlsData.property_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {mlsData.property_url ? 'View Property' : 'N/A'}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MLSTableComponent;
