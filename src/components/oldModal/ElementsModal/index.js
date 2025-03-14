import ModalContent from "./ModalContent";
import "./index.scss";

const ElementsModal = (props) => {
  const { isSaving, currentElem, onClose, onAddElement, onEditElement, setVehicles,children } = props;
  const onSubmit = (element) => {
    if (currentElem) {
      onEditElement(element);
    } else {
      onAddElement(element);
    }
  };

  return (
    <div className="elements-modal">
      {children}
      <ModalContent onSubmit={onSubmit} onClose={onClose} isSaving={isSaving} elementToEdit={currentElem} setVehicles={setVehicles} />
    </div>
  );
};

export default ElementsModal;
