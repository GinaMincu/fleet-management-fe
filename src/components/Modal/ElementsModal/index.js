// import ModalContent from "./ModalContent";
import "./index.scss";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack } from "@mui/material";
import React from "react";

const ElementsModal = ({
  isSaving,
  currentElem,
  onClose,
  onAddElement,
  onEditElement,
  setVehicles,
  children,
}) => {

  const onSubmit = (element) => {
    if (currentElem) {
      onEditElement(element);
    } else {
      onAddElement(element);
    }
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <Stack className="elements-modal">
      <IconButton  onClick={handleOnClose} className="exit-button-modal">
        <CloseIcon size={20} />
      </IconButton >
      {React.cloneElement(children, { onSubmit, isSaving })}
    </Stack>
  );
};

export default ElementsModal;
