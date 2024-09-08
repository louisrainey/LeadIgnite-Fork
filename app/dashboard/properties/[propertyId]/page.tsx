import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PencilIcon, SearchIcon } from 'lucide-react';
import { PropertyDetails } from '@/types/dashboard/maps';
import { Button } from '@/components/ui/button';
import { detailed_properties_saved } from '@/constants/data/properties';
import { notFound } from 'next/navigation';
import PropertyMap from '@/components/maps/properties/propertyMap';
import { Progress } from '@/components/ui/progress';
import PropertyHeader from '@/components/property/page/propertyHeader';
import PropertyCard from '@/components/maps/properties/propertyCard';
import PropertyCardDataComponent from '@/components/property/page/propertyDetailsCard';
import LandLocationInformationComponent from '@/components/property/page/landLocationInformation';
import {
  calculateOwnershipLength,
  convertSqftToAcres
} from '@/constants/utility/property';
import OwnershipInformationComponent from '@/components/property/page/ownerInformation';
import TaxInformationComponent from '@/components/property/page/taxInformation';
import MLSTableComponent from '@/components/property/page/mlsData';
import LinkedPropertiesComponent from '@/components/property/page/linkedProperties';
import ForeclosuresComponent from '@/components/property/page/forclusureLiens';
import TransactionTable from '@/components/property/page/transactionsTable';
import {
  MortgageHistoryTable,
  SaleHistoryTable
} from '@/components/property/page/mortgageHistory';
import {
  CurrentMortgageTable,
  LastSaleTable
} from '@/components/property/page/lastSaleCurrentMortgage';
import WholesaleCalculator from '@/components/property/page/calculations/wholesale';
import AmortizationCalculator from '../../../../components/property/page/calculations/amortizationCalculator';
import ContactInformationCard from '@/components/property/page/contactCard';
import { emptyAgentProperty } from '@/constants/data/testProperties';
import PropertyOverviewCard from '@/components/property/page/propertyOverviewCard';
import PageContainer from '@/components/layout/page-container';
// Async function to fetch property data
async function fetchProperty(id: string): Promise<PropertyDetails | null> {
  try {
    const response = await fetch(`https://api.example.com/properties/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return null;
    }

    const property: PropertyDetails = await response.json();
    return property;
  } catch (error) {
    console.error('Failed to fetch property data:', error);
    return null;
  }
}

export default async function PropertyPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch property data
  let property = await fetchProperty(id);

  // If property data is not found, use the default one
  if (!property) {
    property = detailed_properties_saved[0];
  }

  // If still no property data, render a 404 page
  if (!property) {
    notFound();
  }
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

  const ownershipData = {
    owner1_name: 'Not Available', // Placeholder if owner information is not available
    owner2_name: 'Not Available', // Placeholder if owner information is not available
    ownership_length: calculateOwnershipLength(property.last_sold_date),
    mailing_address: `${property.full_street_line}, ${property.city}, ${property.state} ${property.zip_code}`
  };

  const landLocationData = {
    lot_size: `${convertSqftToAcres(property.lot_sqft)} acres`, // Convert sqft to acres
    lot_area: property.lot_sqft
      ? `${property.lot_sqft.toLocaleString()} sqft`
      : 'N/A', // Safe handling for lot_sqft
    property_class: property.style,
    // apn: property.apn,
    // zoning: property.zoning,
    census_tract: '-', // Placeholder if not available
    block: '-', // Placeholder if not available
    lot_number: '-', // Placeholder if not available
    neighborhood_name: property.neighborhoods,
    neighborhood_type: 'Subdivision' // Assumed from the property type
    // legal_description: property.legal_description,
  };

  const mlsData = {
    mls: property.mls,
    mls_id: property.mls_id,
    list_date: property.list_date,
    list_price: property.list_price,
    sold_price: property.sold_price,
    status: property.status,
    property_url: property.property_url
  };
  const taxInfo = {
    // apn: property.apn,
    tax_year: 2024, // Hardcoded or dynamically set
    tax_amount: property.hoa_fee
      ? `$${property.hoa_fee.toLocaleString()}`
      : 'N/A',
    assessment_year: 2024, // Hardcoded or dynamically set
    total_assessed_value: property.assessed_value
      ? `$${property.assessed_value.toLocaleString()}`
      : 'N/A',
    market_land_value: property.assessed_value
      ? `$${property.assessed_value.toLocaleString()}`
      : 'N/A',
    market_value: property.estimated_value
      ? `$${property.estimated_value.toLocaleString()}`
      : 'N/A',
    market_improvement_value: '-', // Placeholder
    assessed_land_value: '-', // Placeholder
    assessed_improvement_value: '-', // Placeholder
    county: property.county ?? 'N/A'
  };

  const exampleLinkedPropertyData = {
    totalProperties: 3,
    totalOpenLoanAmount: 300000,
    totalEstimatedValue: 1500000,
    totalEquity: 1200000,
    linkedProperties: [
      {
        id: '1',
        address: '123 Main St',
        estimatedValue: 500000,
        openLoanAmount: 100000,
        equity: 400000
      },
      {
        id: '2',
        address: '456 Elm St',
        estimatedValue: 700000,
        openLoanAmount: 200000,
        equity: 500000
      },
      {
        id: '3',
        address: '789 Oak St',
        estimatedValue: 300000,
        openLoanAmount: 0,
        equity: 300000
      }
    ]
  };

  const foreclosureData = {
    active: null,
    documentType: null,
    recordingDate: null,
    originalLoanAmount: null,
    estimatedBankValue: null
  };

  const liensData = {
    taxLiens: 'No' // Assume we know there are no tax liens
  };

  const mortgageData = [
    {
      loan_position: 'First',
      recording_date: '01/02/2021',
      loan_amount: '$880,000',
      est_rate: '-',
      document_number: '949555205',
      deed_type: 'Deed Of Trust',
      lender_name: 'First Centennial Mortgage Corp',
      lender_type: 'Mortgage Company',
      grantee_names: 'Fredric M Winocur, Patricia S Winocur',
      loan_type: 'Conventional'
    }
  ];
  const saleData = {
    date_of_sale: '23/10/2012',
    amount: 1150000, // Sale amount in dollars
    purchase_method: 'Financed',
    document_type: 'Warranty Deed',
    transaction_type: 'Transfer',
    seller_names: 'Harvey, Gary E', // Seller's name
    buyer_names: 'Fredric M Winocur, Patricia S Winocur' // Buyer's name
  };
  const saleHistoryData = [
    {
      date_of_sale: '23/10/2012',
      amount: '$1,150,000',
      purchase_method: 'Financed',
      document_type: 'Warranty Deed',
      transaction_type: 'Transfer',
      seller_names: 'Harvey, Gary E',
      buyer_names: 'Fredric M Winocur, Patricia S Winocur'
    }
  ];
  return (
    <PageContainer scrollable={true}>
      <div className="mx-auto h-auto w-full max-w-full space-y-4">
        {' '}
        {/* Full-width container */}
        <PropertyHeader property={property} />
        {/* Google Maps replacing Placeholder Image */}
        <div className="relative mb-4 h-64 w-full">
          <PropertyMap
            latitude={property.latitude}
            longitude={property.longitude}
            address={`${property.street}, ${property.city}, ${property.state} ${property.zip_code}`}
            details={`${property.beds} bed | ${property.full_baths} bath | ${property.sqft} sqft | ${property.year_built} year built`}
          />
        </div>
        {/* Property Details */}
        <PropertyOverviewCard property={property} />
        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="scrollbar-hide flex space-x-4 overflow-x-auto">
            <TabsTrigger value="overview" className="flex-shrink-0">
              Overview
            </TabsTrigger>
            <TabsTrigger value="property-details" className="flex-shrink-0">
              Property Details
            </TabsTrigger>
            <TabsTrigger value="mls-details" className="flex-shrink-0">
              MLS Details
            </TabsTrigger>
            <TabsTrigger value="tax-information" className="flex-shrink-0">
              Tax Information
            </TabsTrigger>
            <TabsTrigger value="linked-properties" className="flex-shrink-0">
              Linked Properties
            </TabsTrigger>
            <TabsTrigger value="foreclosures-liens" className="flex-shrink-0">
              Foreclosures & Liens
            </TabsTrigger>
            <TabsTrigger
              value="mortgage-transactions"
              className="flex-shrink-0"
            >
              Mortgage & Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ContactInformationCard property={emptyAgentProperty} />
            <WholesaleCalculator />
            <AmortizationCalculator />
          </TabsContent>
          <TabsContent value="property-details">
            <OwnershipInformationComponent ownership={ownershipData} />
            <PropertyCardDataComponent property={property} />
            <LandLocationInformationComponent landLocation={landLocationData} />
          </TabsContent>
          <TabsContent value="mls-details">
            <MLSTableComponent mlsData={mlsData} />
          </TabsContent>
          <TabsContent value="tax-information">
            <TaxInformationComponent taxInfo={taxInfo} />
          </TabsContent>
          <TabsContent value="linked-properties">
            <LinkedPropertiesComponent
              totalProperties={exampleLinkedPropertyData.totalProperties}
              totalOpenLoanAmount={
                exampleLinkedPropertyData.totalOpenLoanAmount
              }
              totalEstimatedValue={
                exampleLinkedPropertyData.totalEstimatedValue
              }
              totalEquity={exampleLinkedPropertyData.totalEquity}
              linkedProperties={exampleLinkedPropertyData.linkedProperties}
            />
          </TabsContent>
          <TabsContent value="foreclosures-liens">
            <ForeclosuresComponent
              foreclosureData={foreclosureData}
              liensData={liensData}
            />
          </TabsContent>
          <TabsContent value="mortgage-transactions">
            <LastSaleTable sale={saleData} />
            <CurrentMortgageTable mortgage={mortgageData[0]} />
            <MortgageHistoryTable mortgages={mortgageData} />
            <SaleHistoryTable sales={saleHistoryData} />
          </TabsContent>
          {/* Add other TabsContent components for the remaining tabs */}
        </Tabs>
      </div>
    </PageContainer>
  );
}
