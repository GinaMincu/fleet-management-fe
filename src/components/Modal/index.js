import "./index.scss";
import { Stack } from "@mui/material";

export const Modal = ({ isOpen, children }) => {
  return <Stack className={`modal-general ${!isOpen ? "closed" : ""}`}>{children}</Stack>;
};

export default Modal;
