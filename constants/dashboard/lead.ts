export type Lead = {
  id: number; // Unique identifier for the lead
  firstName: string; // First name of the lead
  lastName: string; // Last name of the lead
  phone: string; // Phone number
  summary: string; // Summary of the interaction or lead
  bed: number; // Number of bedrooms in the property
  bath: number; // Number of bathrooms in the property
  sqft: number; // Square footage of the property
  status: string; // Lead status (e.g., "New Lead", "Contacted", "Closed", "Lost")
  followUp: string | null; // Follow-up date (can be null if none is set)
  lastUpdate: string; // Last update timestamp
  address1: string; // Address of the lead (optional)
};

export const leads: Lead[] = [
  {
    id: 1,
    firstName: 'Candice',
    lastName: 'Schiner',
    phone: '(555) 123-4567',
    summary: 'Discussed details about the 4-bedroom property.',
    bed: 4,
    bath: 3,
    sqft: 3200,
    status: 'New Lead',
    followUp: '2023-09-12',
    lastUpdate: '2023-09-10',
    address1: '123 Main St, Springfield, IL'
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    phone: '(555) 234-5678',
    summary: 'Interested in selling their 2-bedroom condo.',
    bed: 2,
    bath: 2,
    sqft: 1200,
    status: 'Contacted',
    followUp: '2023-09-15',
    lastUpdate: '2023-09-11',
    address1: '456 Oak St, Chicago, IL'
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    phone: '(555) 345-6789',
    summary: 'Looking to buy a 3-bedroom house.',
    bed: 3,
    bath: 2,
    sqft: 1800,
    status: 'New Lead',
    followUp: null,
    lastUpdate: '2023-09-09',
    address1: '789 Maple Ave, Austin, TX'
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Smith',
    phone: '(555) 456-7890',
    summary: 'Asked for more details about the 5-bedroom house.',
    bed: 5,
    bath: 4,
    sqft: 4000,
    status: 'Closed',
    followUp: null,
    lastUpdate: '2023-09-08',
    address1: '321 Birch St, Seattle, WA'
  },
  {
    id: 5,
    firstName: 'Emma',
    lastName: 'Wilson',
    phone: '(555) 567-8901',
    summary: 'Inquired about investment opportunities in the area.',
    bed: 2,
    bath: 2,
    sqft: 1500,
    status: 'Lost',
    followUp: '2023-09-20',
    lastUpdate: '2023-09-07',
    address1: '654 Cedar Rd, Denver, CO'
  },
  {
    id: 6,
    firstName: 'James',
    lastName: 'Brown',
    phone: '(555) 678-9012',
    summary: 'Considering selling their 4-bedroom home.',
    bed: 4,
    bath: 3,
    sqft: 2500,
    status: 'Contacted',
    followUp: '2023-09-18',
    lastUpdate: '2023-09-06',
    address1: '987 Pine St, Boston, MA'
  },
  {
    id: 7,
    firstName: 'Laura',
    lastName: 'White',
    phone: '(555) 789-0123',
    summary: 'Looking for a vacation property.',
    bed: 3,
    bath: 2,
    sqft: 2000,
    status: 'New Lead',
    followUp: '2023-09-22',
    lastUpdate: '2023-09-05',
    address1: '543 Oakwood Ln, Miami, FL'
  },
  {
    id: 8,
    firstName: 'Michael',
    lastName: 'Lee',
    phone: '(555) 890-1234',
    summary: 'Interested in buying a multi-family unit.',
    bed: 6,
    bath: 5,
    sqft: 5000,
    status: 'Closed',
    followUp: null,
    lastUpdate: '2023-09-04',
    address1: '111 Redwood St, San Francisco, CA'
  },
  {
    id: 9,
    firstName: 'Olivia',
    lastName: 'Green',
    phone: '(555) 901-2345',
    summary: 'Looking for a property to rent out.',
    bed: 2,
    bath: 1,
    sqft: 1000,
    status: 'Lost',
    followUp: null,
    lastUpdate: '2023-09-03',
    address1: '222 Walnut St, Portland, OR'
  },
  {
    id: 10,
    firstName: 'Robert',
    lastName: 'Taylor',
    phone: '(555) 012-3456',
    summary: 'Asked for information on 3-bedroom homes in the area.',
    bed: 3,
    bath: 2,
    sqft: 1900,
    status: 'Contacted',
    followUp: '2023-09-19',
    lastUpdate: '2023-09-02',
    address1: '333 Willow Ave, New York, NY'
  }
];
