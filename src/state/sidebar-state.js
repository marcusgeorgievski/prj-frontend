import { create } from "zustand"

// Sidebar state

// type SidebarState = {
// 	isOpen: boolean;
// 	openSidebar: () => void;
// 	closeSidebar: () => void;
// 	toggleSidebar: () => void;
// 	setSidebar: (state: boolean) => void;
// };

export const useSidebar = create((set, get) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set({ isOpen: !get().isOpen }),
  setSidebar: (state) => set({ isOpen: state }),
}))
