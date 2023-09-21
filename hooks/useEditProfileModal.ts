import { create } from "zustand";

type EditProfileStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useEditProfileModal = create<EditProfileStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProfileModal;
