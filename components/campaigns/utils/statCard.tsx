import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  onClick: () => void; // New onClick prop for handling the click action
}

const StatCard: React.FC<StatCardProps> = ({ title, value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-md bg-white p-4 text-center shadow-md transition-all hover:outline hover:outline-2 hover:outline-gray-300 dark:bg-gray-800 dark:text-white dark:hover:outline-gray-600"
    >
      <p>{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
