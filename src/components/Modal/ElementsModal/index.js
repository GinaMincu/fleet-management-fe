// import ModalContent from "./ModalContent";
import "./index.scss";
import CloseIcon from "@mui/icons-material/Close";
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
    // resetInputData();
    onClose();
  };

  return (
    <div className="elements-modal">
      <button className="exit-button-modal" onClick={handleOnClose}>
        <CloseIcon size={20} />
      </button>
      {React.cloneElement(children, { onSubmit, isSaving })}
    </div>
  );
};

export default ElementsModal;
