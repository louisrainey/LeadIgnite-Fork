import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  onClick: () => void;
  isActive: boolean; // Prop to check if the card is active
  click: boolean; // Prop to check if the card can be clicked
  animationComplete: boolean; // Prop to check if the animation should stop
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  onClick,
  isActive,
  click,
  animationComplete
}) => {
  return (
    <div
      onClick={click ? onClick : undefined} // Only trigger onClick if 'click' is true
      className={`${
        click && `cursor-pointer`
      } rounded-md bg-white p-4 text-center shadow-md transition-all dark:bg-gray-800 dark:text-white ${
        click && isActive && !animationComplete && value > 0
          ? 'animate-pulse border-4 border-orange-500 dark:border-gray-400' // Animate if not complete
          : ''
      }`}
    >
      <p>{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
};

export default StatCard;
