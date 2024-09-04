import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Pencil } from 'lucide-react';

// Replace 'any' with your PropertyDetails type if available
interface PropertyOverviewCardProps {
  property: any; // Should be your property type if you have it defined
}

const PropertyOverviewCard: React.FC<PropertyOverviewCardProps> = ({
  property
}) => {
  // Calculate equity and equity percentage based on estimated value and mortgage balance
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

  return (
    <Card>
      <CardContent className="p-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-8">
          <div>
            <h2 className="mb-2 font-semibold">Owner Name</h2>
            <div className="flex items-center">
              {property.agent} <Pencil className="ml-2 h-4 w-4 text-blue-500" />
            </div>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">
              Mortgages{' '}
              <span className="rounded-full bg-gray-200 px-2 text-sm">0</span>
            </h2>
            <div>-</div>
          </div>
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
