import { create } from 'zustand';

// Sidebar state

export const useSidebar = create((set, get) => ({
  isOpen: true,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set({ isOpen: !get().isOpen }),
  setSidebar: (state) => set({ isOpen: state }),
}));
