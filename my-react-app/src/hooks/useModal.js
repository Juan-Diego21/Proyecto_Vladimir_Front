import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data = null) => {
    setModalData(data);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevenir scroll del body
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
    document.body.style.overflow = "unset"; // Restaurar scroll
  };

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
  };
};

export default useModal;
