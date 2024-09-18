import { faker } from '@faker-js/faker';
import {
  APP_TESTING_MODE,
  generateMockLeads,
  staticMockLeadData
} from '../data';
import { LeadTypeGlobal } from '@/types/_dashboard/leads';

export type LeadList = {
  id: number; // Unique identifier for the lead list
  listName: string; // Name of the list
  uploadDate: string; // Date when the list was uploaded
  leads: LeadTypeGlobal[];
  records: number; // Number of records in the list
  phone: number; // Number of phone numbers in the list
  dataLink: string; // Where the list is stored
  socials: SocialsCount; // Social media account counts
  emails: number; // Number of email addresses in the list
};

export type SocialsCount = {
  facebook?: number; // Number of Facebook accounts in the list
  linkedin?: number; // Number of LinkedIn accounts in the list
  instagram?: number; // Number of Instagram accounts in the list
  twitter?: number; // Number of Twitter accounts in the list
};

export function generateMockLeadLists(count: number): LeadList[] {
  const leadLists: LeadList[] = [];

  for (let i = 0; i < count; i++) {
    const leadList: LeadList = {
      id: i + 1,
      listName: faker.company.name(), // Random company name as the list name
      uploadDate: faker.date.past().toISOString().split('T')[0], // Random past date
      leads: generateMockLeads(10),
      records: faker.number.int({ min: 100, max: 10000 }), // Random number of records
      phone: faker.number.int({ min: 50, max: 10000 }), // Random number of phone numbers
      dataLink: faker.internet.url(), // Random URL for data link
      emails: faker.number.int({ min: 50, max: 5000 }), // Random number of email addresses
      socials: {
        facebook: faker.number.int({ min: 0, max: 5000 }), // Random number of Facebook accounts
        linkedin: faker.number.int({ min: 0, max: 5000 }), // Random number of LinkedIn accounts
        instagram: faker.number.int({ min: 0, max: 5000 }), // Random number of Instagram accounts
        twitter: faker.number.int({ min: 0, max: 5000 }) // Random number of Twitter accounts
      }
    };

    leadLists.push(leadList);
  }

  return leadLists;
}

export const mockLeadListData = APP_TESTING_MODE && generateMockLeadLists(100);

export const leadListData: LeadList[] = [
  {
    id: 1,
    listName: 'Louisville - On Market / 3+ Beds',
    uploadDate: '2 weeks ago',
    records: 720,
    phone: 2021,
    leads: staticMockLeadData,
    dataLink: 'https://example.com/download/louisville-on-market',
    emails: 1500, // Number of emails
    socials: {
      facebook: 500,
      linkedin: 200,
      instagram: 400,
      twitter: 150
    }
  },
  {
    id: 2,
    listName: 'New York - Notice Of Default / Lis Pendens',
    uploadDate: '2 weeks ago',
    records: 899,
    leads: staticMockLeadData,

    phone: 2509,
    dataLink: 'https://example.com/download/new-york-notice-default',
    emails: 1800,
    socials: {
      facebook: 700,
      linkedin: 300,
      instagram: 600,
      twitter: 250
    }
  },
  {
    id: 3,
    listName: 'Seattle - Probate / Inheritance Only',
    uploadDate: '2 weeks ago',
    records: 992,
    leads: staticMockLeadData,

    phone: 2723,
    dataLink: 'https://example.com/download/seattle-probate',
    emails: 1200,
    socials: {
      facebook: 400,
      linkedin: 150,
      instagram: 350,
      twitter: 100
    }
  },
  {
    id: 4,
    listName: 'Cleveland - 2+ Units / VA Or FHA Loan',
    uploadDate: '2 weeks ago',
    records: 1100,
    leads: staticMockLeadData,

    phone: 2975,
    dataLink: 'https://example.com/download/cleveland-va-fha-loan',
    emails: 1700,
    socials: {
      facebook: 650,
      linkedin: 270,
      instagram: 450,
      twitter: 180
    }
  },
  {
    id: 5,
    listName: 'Atlanta - REO / Vacant',
    uploadDate: '2 weeks ago',
    records: 445,
    leads: staticMockLeadData,

    phone: 1230,
    dataLink: 'https://example.com/download/atlanta-reo-vacant',
    emails: 1000,
    socials: {
      facebook: 300,
      linkedin: 100,
      instagram: 250,
      twitter: 90
    }
  },
  {
    id: 6,
    listName: 'San Diego - Assumable Debt / Investor Buyer',
    uploadDate: '2 weeks ago',
    records: 967,
    leads: staticMockLeadData,

    phone: 2670,
    dataLink: 'https://example.com/download/san-diego-investor-buyer',
    emails: 1300,
    socials: {
      facebook: 500,
      linkedin: 220,
      instagram: 450,
      twitter: 170
    }
  },
  {
    id: 7,
    listName: 'Detroit - Low Equity / Tax Liens',
    uploadDate: '2 weeks ago',
    records: 1053,
    leads: staticMockLeadData,

    phone: 2863,
    dataLink: 'https://example.com/download/detroit-tax-liens',
    emails: 1600,
    socials: {
      facebook: 600,
      linkedin: 250,
      instagram: 400,
      twitter: 140
    }
  },
  {
    id: 8,
    listName: 'Tampa 55+ / 70%+ Equity',
    uploadDate: '2 weeks ago',
    records: 620,
    leads: staticMockLeadData,

    phone: 1728,
    dataLink: 'https://example.com/download/tampa-55-plus-equity',
    emails: 1100,
    socials: {
      facebook: 350,
      linkedin: 140,
      instagram: 300,
      twitter: 120
    }
  },
  {
    id: 9,
    listName: 'Chicago Absentee + Low Equity',
    uploadDate: '2 weeks ago',
    records: 1019,
    leads: staticMockLeadData,

    phone: 2789,
    dataLink: 'https://example.com/download/chicago-low-equity',
    emails: 1450,
    socials: {
      facebook: 500,
      linkedin: 200,
      instagram: 400,
      twitter: 160
    }
  },
  {
    id: 10,
    listName: 'Austin Pre-Foreclosures',
    uploadDate: '2 weeks ago',
    records: 808,
    leads: staticMockLeadData,

    phone: 2271,
    dataLink: 'https://example.com/download/austin-pre-foreclosures',
    emails: 1250,
    socials: {
      facebook: 450,
      linkedin: 180,
      instagram: 350,
      twitter: 130
    }
  }
];
