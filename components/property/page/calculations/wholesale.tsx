'use client';
import { useState } from 'react';

export default function WholesaleCalculator() {
  const [arv, setArv] = useState<number | ''>(''); // After Repair Value
  const [repairs, setRepairs] = useState<number | ''>(''); // Cost of Repairs
  const [assignmentFee, setAssignmentFee] = useState<number | ''>(''); // Assignment Fee
  const [profitMargin, setProfitMargin] = useState<number>(0.7); // Profit Margin default to 70%

  const calculateMAO = () => {
    if (arv && repairs && assignmentFee !== '') {
      return arv * profitMargin - repairs - assignmentFee;
    }
    return 0;
  };

  const handleProfitMarginChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProfitMargin(parseFloat(event.target.value));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Wholesale Calculator</h2>
      <p className="mb-4">
        Easily make the right wholesale offer with confidence.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>After Repair Value (ARV)*</label>
          <input
            type="number"
            className="rounded border p-2"
            placeholder="Enter the ARV"
            value={arv}
            onChange={(e) => setArv(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label>Cost of Repairs*</label>
          <input
            type="number"
            className="rounded border p-2"
            placeholder="Enter the repairs"
            value={repairs}
            onChange={(e) => setRepairs(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label>Assignment Fee*</label>
          <input
            type="number"
            className="rounded border p-2"
            placeholder="Enter the assignment fee"
            value={assignmentFee}
            onChange={(e) => setAssignmentFee(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label>Profit Margin*</label>
          <select
            className="rounded border p-2"
            value={profitMargin}
            onChange={handleProfitMarginChange}
          >
            <option value={0.7}>70%</option>
            <option value={0.75}>75%</option>
            <option value={0.8}>80%</option>
          </select>
        </div>
      </div>

      <div className="mb-4 text-right">
        <span className="font-semibold text-gray-600">
          Max Allowable Offer (MAO):{' '}
        </span>
        <span className="font-bold">${calculateMAO().toLocaleString()}</span>
      </div>
    </div>
  );
}
