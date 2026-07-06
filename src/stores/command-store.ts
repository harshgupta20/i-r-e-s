import { create } from 'zustand'

interface CommandState {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

/** Global open/close state for the ⌘K command menu. */
export const useCommandStore = create<CommandState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}))
