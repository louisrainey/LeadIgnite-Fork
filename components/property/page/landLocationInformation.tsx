'use client';

import React from 'react';

interface LandLocationDetails {
  lot_size: string;
  lot_area: string;
  property_class: string;
  // apn: string;
  // zoning: string;
  census_tract: string;
  block: string;
  lot_number: string;
  neighborhood_name: string;
  neighborhood_type: string;
  // legal_description: string;
}

interface LandLocationProps {
  landLocation: LandLocationDetails;
}

const LandLocationInformationComponent: React.FC<LandLocationProps> = ({
  landLocation
}) => {
  const renderLandLocationDetails = (label: string, value: any) => {
    return (
      <div className="mb-4 flex flex-col items-start">
        <span className="font-semibold text-gray-500">{label}</span>
        <span>{value ?? '-'}</span>
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Land/Location Information</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {renderLandLocationDetails('Lot Size', landLocation.lot_size)}
        {renderLandLocationDetails('Lot Area', landLocation.lot_area)}
        {renderLandLocationDetails(
          'Property Class',
          landLocation.property_class
        )}
        {/* {renderLandLocationDetails('APN', landLocation.apn)}
                {renderLandLocationDetails('Zoning', landLocation.zoning)} */}
        {renderLandLocationDetails('Census Tract', landLocation.census_tract)}
        {renderLandLocationDetails('Block', landLocation.block)}
        {renderLandLocationDetails('Lot Number', landLocation.lot_number)}
        {renderLandLocationDetails(
          'Neighborhood Name',
          landLocation.neighborhood_name
        )}
        {renderLandLocationDetails(
          'Neighborhood Type',
          landLocation.neighborhood_type
        )}
        {/* <div className="col-span-2">
                    {renderLandLocationDetails('Legal Description', landLocation.legal_description)}
                </div> */}
      </div>
    </div>
  );
};

export default LandLocationInformationComponent;
