import { useState } from "react";

export default function useModal() {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Open Modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
