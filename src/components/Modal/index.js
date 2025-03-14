import "./index.scss";

export const Modal = ({ isOpen, children }) => {
  return <div className={`modal-general ${!isOpen ? "closed" : ""}`}>{children}</div>;
};

export default Modal;
