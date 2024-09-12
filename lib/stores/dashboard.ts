// stores/useModalStore.ts

import create from 'zustand';

interface ModalState {
  isUsageModalOpen: boolean;
  openUsageModal: () => void;
  closeUsageModal: () => void;

  isBillingModalOpen: boolean;
  openBillingModal: () => void;
  closeBillingModal: () => void;

  isIntegrationsModalOpen: boolean;
  openIntegrationsModal: () => void;
  closeIntegrationsModal: () => void;

  isSubscriptionModalOpen: boolean;
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Usage Modal
  isUsageModalOpen: false,
  openUsageModal: () => set({ isUsageModalOpen: true }),
  closeUsageModal: () => set({ isUsageModalOpen: false }),

  // Billing Modal
  isBillingModalOpen: false,
  openBillingModal: () => set({ isBillingModalOpen: true }),
  closeBillingModal: () => set({ isBillingModalOpen: false }),

  // Integrations Modal
  isIntegrationsModalOpen: false,
  openIntegrationsModal: () => set({ isIntegrationsModalOpen: true }),
  closeIntegrationsModal: () => set({ isIntegrationsModalOpen: false }),

  // Subscription Modal
  isSubscriptionModalOpen: false,
  openSubscriptionModal: () => set({ isSubscriptionModalOpen: true }),
  closeSubscriptionModal: () => set({ isSubscriptionModalOpen: false })
}));
