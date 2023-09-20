import { create } from "zustand";

type RegisterStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useRegisterModal = create<RegisterStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
