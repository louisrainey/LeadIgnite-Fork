'use client';
import { useState } from 'react';

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState<number | ''>(''); // Loan Amount
  const [loanTerm, setLoanTerm] = useState<number | ''>(''); // Loan Term in years
  const [interestRate, setInterestRate] = useState<number | ''>(''); // Annual Interest Rate

  const calculateMonthlyPayment = () => {
    if (loanAmount && loanTerm && interestRate !== '') {
      const monthlyInterestRate = interestRate / 100 / 12; // Convert annual rate to monthly
      const numberOfPayments = loanTerm * 12; // Total number of payments (months)
      const numerator =
        loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const denominator =
        Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
      const monthlyPayment = numerator / denominator;

      return monthlyPayment; // Return the raw monthly payment number
    }
    return 0;
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Amortization Calculator</h2>
      <p className="mb-4">Modify the values to quickly analyze a deal.</p>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label>Loan Amount*</label>
          <input
            type="number"
            className="rounded border p-2"
            placeholder="Enter the loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label>Loan Term (Years)*</label>
          <input
            type="number"
            className="rounded border p-2"
            placeholder="Enter number of years"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label>Interest Rate (%) *</label>
          <input
            type="number"
            step="0.01"
            className="rounded border p-2"
            placeholder="Enter the interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mb-4 text-right">
        <span className="font-semibold text-gray-600">Monthly Payment: </span>
        <span className="font-bold">
          $
          {calculateMonthlyPayment().toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      </div>
    </div>
  );
}
