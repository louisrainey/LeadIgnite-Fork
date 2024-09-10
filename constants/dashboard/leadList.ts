export type LeadList = {
  id: number; // Unique identifier for the lead list
  listName: string; // Name of the list
  uploadDate: string; // Date when the list was uploaded
  records: number; // Number of records in the list
  phone: number; // Number of phone numbers in the list
  dataLink: string;
};

export const leadListData: LeadList[] = [
  {
    id: 1,
    listName: 'Louisville - On Market / 3+ Beds',
    uploadDate: '2 weeks ago',
    records: 720,
    phone: 2021,
    dataLink: 'https://example.com/download/louisville-on-market'
  },
  {
    id: 2,
    listName: 'New York - Notice Of Default / Lis Pendens',
    uploadDate: '2 weeks ago',
    records: 899,
    phone: 2509,
    dataLink: 'https://example.com/download/new-york-notice-default'
  },
  {
    id: 3,
    listName: 'Seattle - Probate / Inheritance Only',
    uploadDate: '2 weeks ago',
    records: 992,
    phone: 2723,
    dataLink: 'https://example.com/download/seattle-probate'
  },
  {
    id: 4,
    listName: 'Cleveland - 2+ Units / VA Or FHA Loan',
    uploadDate: '2 weeks ago',
    records: 1100,
    phone: 2975,
    dataLink: 'https://example.com/download/cleveland-va-fha-loan'
  },
  {
    id: 5,
    listName: 'Atlanta - REO / Vacant',
    uploadDate: '2 weeks ago',
    records: 445,
    phone: 1230,
    dataLink: 'https://example.com/download/atlanta-reo-vacant'
  },
  {
    id: 6,
    listName: 'San Diego - Assumable Debt / Investor Buyer',
    uploadDate: '2 weeks ago',
    records: 967,
    phone: 2670,
    dataLink: 'https://example.com/download/san-diego-investor-buyer'
  },
  {
    id: 7,
    listName: 'Detroit - Low Equity / Tax Liens',
    uploadDate: '2 weeks ago',
    records: 1053,
    phone: 2863,
    dataLink: 'https://example.com/download/detroit-tax-liens'
  },
  {
    id: 8,
    listName: 'Tampa 55+ / 70%+ Equity',
    uploadDate: '2 weeks ago',
    records: 620,
    phone: 1728,
    dataLink: 'https://example.com/download/tampa-55-plus-equity'
  },
  {
    id: 9,
    listName: 'Chicago Absentee + Low Equity',
    uploadDate: '2 weeks ago',
    records: 1019,
    phone: 2789,
    dataLink: 'https://example.com/download/chicago-low-equity'
  },
  {
    id: 10,
    listName: 'Austin Pre-Foreclosures',
    uploadDate: '2 weeks ago',
    records: 808,
    phone: 2271,
    dataLink: 'https://example.com/download/austin-pre-foreclosures'
  }
];
