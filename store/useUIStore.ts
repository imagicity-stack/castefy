import { create } from 'zustand';

interface UIState {
  showMatchModal: boolean;
  setShowMatchModal: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showMatchModal: false,
  setShowMatchModal: (show) => set({ showMatchModal: show })
}));
