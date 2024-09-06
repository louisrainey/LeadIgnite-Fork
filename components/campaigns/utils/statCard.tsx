import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="rounded-md bg-white p-4 text-center shadow-md dark:bg-gray-800 dark:text-white">
      <p>{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
