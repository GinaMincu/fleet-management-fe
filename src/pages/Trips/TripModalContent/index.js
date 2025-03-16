import { useEffect, useState } from "react";
import "./index.scss";
import { Box, Button, Stack } from "@mui/material";
import { addTrip, getTrips } from "../../../services/fetch";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Modal = (props) => {
  const location = useLocation();

  const { isSaving, onSubmit, elementToEdit, setTrips } = props;

  const [currentElementDriver, setCurrentElementDriver] = useState("");
  const [currentElementEndTs, setCurrentElementEndTs] = useState(dayjs());
  const [currentElementStartTs, setCurrentElementStartTs] = useState(dayjs());

  const resetInputData = () => {
    setCurrentElementDriver("");
    setCurrentElementStartTs(dayjs());
    setCurrentElementEndTs(dayjs());
  };

  useEffect(() => {
    if (elementToEdit) {
      setCurrentElementDriver(elementToEdit.driver);
      setCurrentElementStartTs(elementToEdit.start_ts);
      setCurrentElementEndTs(elementToEdit.end_ts);
    }else{
      resetInputData();
    }
  }, [elementToEdit]);

  const handleOnSubmit = async () => {
    if (!elementToEdit) {
      // We don't have an element already defined, so we are in create mode
      const newElement = {
        vehicle: location.state?.vehicle.id,
        driver: currentElementDriver,
        start_ts: currentElementStartTs,
        end_ts: currentElementEndTs,
      };

      try {
        const resp = await addTrip(newElement);
        onSubmit(resp);
        const respGetTrips = await getTrips();
        setTrips(respGetTrips);
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
        <label className="label">Driver</label>
        <input
          id="driver"
          name="driver"
          className="input"
          onChange={(element) => {
            setCurrentElementDriver(element.target.value);
          }}
          value={currentElementDriver}
        ></input>
      </Stack>

      <Stack
        sx={{
          gap: "7px",
          alignItems: "start",
        }}
      >
        <label className="label">Start time:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            id="start_ts"
            name="start_ts"
            className="datetimepicker"
            value={currentElementStartTs}
            onChange={(element) => {
              setCurrentElementEndTs(element.target.value);
            }}
          />
        </LocalizationProvider>
      </Stack>

      <Stack
        sx={{
          gap: "7px",
          alignItems: "start",
        }}
      >
        <label className="label">End time:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            id="end_ts"
            name="end_ts"
            className="datetimepicker"
            value={currentElementEndTs}
            onChange={(element) => {
              setCurrentElementEndTs(element.target.value);
            }}
          />
        </LocalizationProvider>
      </Stack>

      <Button className="add-element-btn" onClick={handleOnSubmit}>
        {elementToEdit ? <Box>Update Element</Box> : <Box>Add Element</Box>}
      </Button>
    </Stack>
  );
};

export default Modal;
