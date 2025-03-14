// import { NoteType, getNoteTypeLabel } from "constants/NoteTypes";
import { useEffect, useState } from "react";
// import TextNoteInput from "../inputs/TextNoteInput";
import { v4 as uuidv4 } from "uuid";
// import { NoteElement, TextNote } from "typings/notes";
import "./index.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography, Button, Input } from "@mui/material";
import {
  updateVehicle,
  getVehicles,
  addVehicle,
} from "../../../../services/fetch";

const Modal = (props) => {
  // Unpack props for easy access
  const { isSaving, onClose, onSubmit, elementToEdit, setVehicles } = props;

  const [currentElementPlateNumber, setCurrentElementPlateNumber] =
    useState("");
  const [currentElementModel, setCurrentElementModel] = useState("");
  const [currentElementColor, setCurrentElementColor] = useState("");

  useEffect(() => {
    if (elementToEdit) {
      setCurrentElementPlateNumber(elementToEdit.plate);
      setCurrentElementModel(elementToEdit.model);
      setCurrentElementColor(elementToEdit.color);
    }
  }, [elementToEdit]);

  const resetInputData = () => {
    setCurrentElementPlateNumber("");
    setCurrentElementModel("");
    setCurrentElementColor("");
  };

  // useEffect(() => {
  //   if (!elementToEdit) {
  //     // We reset the fields only when we are out of edit mode
  //     switch (currentElementType) {
  //       case {}:
  //         setCurrentElementData(EMPTY_NOTE_DATA);
  //         break;
  //       default:
  //         setCurrentElementData(undefined);
  //         break;
  //     }
  //   }
  // }, [elementToEdit, currentElementType]);

  const handleOnSubmit = async () => {
    if (elementToEdit) {
      // We have an element already defined, so we are in edit mode
      const updatedElement = {
        plate: currentElementPlateNumber,
        model: currentElementModel,
        color: currentElementColor,
      };

      try {
        const resp = await updateVehicle(elementToEdit.id, updatedElement);

        onSubmit(resp);
        const respGetVehicles = await getVehicles();
        setVehicles(respGetVehicles.results);
      } catch (error) {
        console.error("Failed", error);
      }
    } else {
      // We don't have an element already defined, so we are in create mode
      const newElement = {
        plate: currentElementPlateNumber,
        model: currentElementModel,
        color: currentElementColor,
      };
      try {
        const resp = await addVehicle(newElement);

        onSubmit(resp);
        const respGetVehicles = await getVehicles();
        setVehicles(respGetVehicles.results);
      } catch (error) {
        console.error("Failed", error);
      }
    }

    resetInputData();
  };

  const handleOnClose = () => {
    resetInputData();
    onClose();
  };

  return (
    <div>
      <button className="exit-button-modal" onClick={handleOnClose}>
        <CloseIcon size={20} />
      </button>

      <div className="modal-content-main-div">
        {isSaving && <p>Saving...</p>}

        <Stack
          sx={{
            gap: "7px",
            alignItems: "start",
          }}
        >
          <label className="label">Plate number:</label>
          <input
            id="plateNumber"
            name="plateNumber"
            className="input"
            onChange={(element) => {
              setCurrentElementPlateNumber(element.target.value);
            }}
            value={currentElementPlateNumber}
          >
          </input>
        </Stack>

        <Stack
          sx={{
            gap: "7px",
            alignItems: "start",
          }}
        >
          <label className="label">Model:</label>
          <input
            id="model"
            name="model"
            className="input"
            onChange={(element) => {
              setCurrentElementModel(element.target.value);
            }}
            value={currentElementModel}
          >
          </input>
        </Stack>

        <Stack
          sx={{
            gap: "7px",
            alignItems: "start",
          }}
        >
          <label className="label">Color:</label>
          <input
            id="color"
            name="color"
            className="input"
            onChange={(element) => {
              setCurrentElementColor(element.target.value);
            }}
            value={currentElementColor}
          >

          </input>
        </Stack>

        <button className="add-element-btn" onClick={handleOnSubmit}>
          {elementToEdit ? (
            <span>Update Element</span>
          ) : (
            <span>Add Element</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Modal;
