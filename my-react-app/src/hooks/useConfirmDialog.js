import { useState } from "react";

const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (data) => {
    setDialogData(data);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogData(null);
    document.body.style.overflow = "unset";
  };

  return {
    isOpen,
    dialogData,
    openDialog,
    closeDialog,
  };
};

export default useConfirmDialog;
