import { create } from 'zustand';
import { LeadTypeGlobal, mockGeneratedLeads } from '@/constants/data'; // Assuming you have mock leads data

// Define the state and actions for managing leads
interface LeadState {
  leads: LeadTypeGlobal[]; // Holds the lead data
  filteredLeads: LeadTypeGlobal[]; // Holds the filtered lead data
  filterByStatus: (
    status: 'all' | 'New Lead' | 'Contacted' | 'Closed' | 'Lost'
  ) => void; // Filter by status
  filterByFollowUp: (startDate: string, endDate: string) => void; // Filter by follow-up date range
  filterByCampaignID: (campaignID: string) => void; // Filter by campaign ID
  resetFilters: () => void; // Reset all filters
  getNumberOfLeads: () => number; // Get the count of filtered leads
}

// Create Zustand store for lead management
export const useLeadStore = create<LeadState>((set, get) => ({
  leads: mockGeneratedLeads, // Initial leads data
  filteredLeads: mockGeneratedLeads, // Start with no filter applied, showing all leads

  // Filter leads by status (New Lead, Contacted, Closed, Lost)
  filterByStatus: (status) => {
    const { leads } = get();
    let filteredLeads = leads;

    if (status !== 'all') {
      filteredLeads = leads.filter((lead) => lead.status === status);
    }

    set({ filteredLeads });
  },

  // Filter leads by follow-up date range (inclusive)
  filterByFollowUp: (startDate, endDate) => {
    const { leads } = get();
    const filteredLeads = leads.filter((lead) => {
      if (lead.followUp) {
        const followUpDate = new Date(lead.followUp);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return followUpDate >= start && followUpDate <= end;
      }
      return false; // Exclude leads without follow-up dates
    });

    // Check if no leads were found for today
    if (filteredLeads.length === 0) {
      alert("No leads found for today's follow-ups.");
      return;
    }

    set({ filteredLeads });
  },

  // Filter leads by campaign ID
  filterByCampaignID: (campaignID) => {
    const { leads } = get();
    const filteredLeads = leads.filter(
      (lead) => lead.campaignID === campaignID
    );

    set({ filteredLeads });
  },

  // Reset all filters to show all leads
  resetFilters: () => {
    const { leads } = get();
    set({ filteredLeads: leads });
  },

  // Get the number of filtered leads
  getNumberOfLeads: () => {
    const { filteredLeads } = get();
    return filteredLeads.length;
  }
}));
