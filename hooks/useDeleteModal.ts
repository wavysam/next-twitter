import { create } from "zustand";

type DeleteModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
