import { useEffect, useState } from "react";
import "./index.scss";
import { Stack, Button, Box } from "@mui/material";
import {
  updateVehicle,
  getVehicles,
  addVehicle,
} from "../../../services/fetch";

const Modal = (props) => {

  const { isSaving, onSubmit, elementToEdit, setVehicles } = props;

  const [currentElementPlateNumber, setCurrentElementPlateNumber] = useState("");
  const [currentElementModel, setCurrentElementModel] = useState("");
  const [currentElementColor, setCurrentElementColor] = useState("");

  const resetInputData = () => {
    setCurrentElementPlateNumber("");
    setCurrentElementModel("");
    setCurrentElementColor("");
  };

  useEffect(() => {
    if (elementToEdit) {
      setCurrentElementPlateNumber(elementToEdit.plate);
      setCurrentElementModel(elementToEdit.model);
      setCurrentElementColor(elementToEdit.color);
    }else{
      resetInputData()
    }
  }, [elementToEdit]);


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
        setVehicles(respGetVehicles);
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
        setVehicles(respGetVehicles);
      } catch (error) {
        console.error("Failed", error);
      }
    }

    resetInputData();
  };

  return (
      <Stack className="modal-content-main-div">
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
          ></input>
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
          ></input>
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
          ></input>
        </Stack>

        <Button className="add-element-btn" onClick={handleOnSubmit}>
          {elementToEdit ? (
            <Box>Update Element</Box>
          ) : (
            <Box>Add Element</Box>
          )}
        </Button>
      </Stack>
  );
};

export default Modal;
