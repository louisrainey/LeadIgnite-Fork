'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pencil } from 'lucide-react'; // No need to use Save button now

interface PropertyOverviewCardProps {
  property: any; // Replace with your property type if available
}

const PropertyOverviewCard: React.FC<PropertyOverviewCardProps> = ({
  property
}) => {
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [ownerName, setOwnerName] = useState(property.agent); // Store owner name
  const [tempOwnerName, setTempOwnerName] = useState(property.agent); // Temporary editable value

  const inputRef = useRef<HTMLInputElement>(null); // Ref for input box

  // Calculate equity and percentage
  const equity =
    property.estimated_value && property.mortgage_balance
      ? property.estimated_value - property.mortgage_balance
      : 0;

  const equityPercentage = property.estimated_value
    ? (equity / property.estimated_value) * 100
    : 0;

  let equityStatus = 'Low';
  if (equityPercentage > 70) {
    equityStatus = 'High';
  } else if (equityPercentage > 40) {
    equityStatus = 'Medium';
  }

  // Save changes and exit edit mode
  const handleSave = () => {
    setOwnerName(tempOwnerName); // Save edited owner name
    setIsEditing(false); // Exit edit mode
  };

  // Auto-save when clicking outside the input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  // Handle "Enter" key to save
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Card className="dark:bg-gray-800 dark:text-white">
      <CardContent className="p-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
          {/* Owner Name Field */}
          <div>
            <h2 className="mb-2 font-semibold">Owner Name</h2>
            <div className="flex items-center space-x-2">
              {/* Editable input or static text */}
              {isEditing ? (
                <input
                  ref={inputRef} // Attach ref to input
                  type="text"
                  value={tempOwnerName}
                  onChange={(e) => setTempOwnerName(e.target.value)}
                  maxLength={50}
                  onKeyDown={handleKeyDown} // Save on pressing "Enter"
                  className="w-48 rounded border border-gray-300 p-1 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <span>{ownerName}</span>
              )}

              {/* Pencil button */}
              {!isEditing && (
                <Pencil
                  onClick={() => setIsEditing(true)}
                  className="h-4 w-4 cursor-pointer text-blue-500"
                />
              )}
            </div>
          </div>

          {/* Mortgages */}
          <div>
            <h2 className="mb-2 font-semibold">
              Mortgages{' '}
              <span className="rounded-full bg-gray-200 px-2 text-sm dark:bg-gray-700 dark:text-gray-300">
                0
              </span>
            </h2>
            <div>-</div>
          </div>

          {/* Equity */}
          <div>
            <h2 className="mb-2 font-semibold">
              Equity <span className="text-sm text-gray-500">(est.)</span>
            </h2>
            <div className="flex items-center">
              {property.estimated_value
                ? `$${equity.toLocaleString()} | ${equityPercentage.toFixed(
                    2
                  )}%`
                : 'N/A'}
              <span
                className={`ml-2 text-sm text-${
                  equityStatus === 'High'
                    ? 'green'
                    : equityStatus === 'Medium'
                    ? 'yellow'
                    : 'red'
                }-500`}
              >
                {equityStatus}
              </span>
            </div>
            <Progress
              value={equityPercentage}
              className="mt-2 h-2 rounded-full bg-blue-500"
            />
          </div>

          {/* Other Property Details */}
          <div>
            <h2 className="mb-2 font-semibold">Occupancy</h2>
            <div>Owner Occupied</div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Taxes</h2>
            <div>
              $
              {property.hoa_fee
                ? `${property.hoa_fee.toLocaleString()}/mo`
                : 'N/A'}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Est. Value</h2>
            <div>
              $
              {property.estimated_value
                ? property.estimated_value.toLocaleString()
                : 'N/A'}
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Last Sale</h2>
            <div>{property.last_sold_date || '-'}</div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">MLS</h2>
            <div>{property.mls_id || 'Inactive'}</div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">
              FMR <span className="text-sm text-gray-500">(HUD)</span>
            </h2>
            <div>$2,750.00/mo</div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">
              Rent <span className="text-sm text-gray-500">(est.)</span>
            </h2>
            <div>$2,750.00/mo</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyOverviewCard;
