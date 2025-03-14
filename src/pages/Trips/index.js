import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import Modal from "../../components/Modal";
import ElementsModal from "../../components/Modal/ElementsModal";
import TripModalContent from "./TripModalContent";

const Trips = () => {
  const location = useLocation();
  const [trips, setTrips] = useState(location.state?.vehicle.trips || null);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elementToEdit, setElementToEdit] = useState();
  const [isSaving, setIsSaving] = useState(false);

  const columns = [
    // {
    //   name: <span className="font-weight-bold fs-13">Id</span>,
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Driver</span>,
      selector: (row) => row.driver,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Start</span>,
      selector: (row) => moment.utc(row.start_ts).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">End</span>,
      selector: (row) => moment.utc(row.end_ts).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
  ];

  const handleAddNewTrip = (newTrip) => {
    setElementToEdit(newTrip);

    setIsSaving(true);
    setTimeout(toggleModal, 500);
  };

  const handleBackToPrevPage = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsSaving(false);
  };

  return (
    <Stack
      spacing={1}
      direction="column"
      style={{ backgroundColor: "white", marginTop: "10px" }}
    >
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
        direction="row"
      >
        <ArrowBackIcon
          sx={{ backgroundColor: "white", border: "0px", cursor: "pointer" }}
          fontSize="medium"
          onClick={() => handleBackToPrevPage()}
        ></ArrowBackIcon>
        <Button
          sx={{
            backgroundColor: "#062c43",
            color: "white",
            borderRadius: "7px",
            padding: "7px 10px",
            float: "right",
            fontWeight: "bold",
            fontSize: "13px",
          }}
          onClick={() => handleAddNewTrip()}
        >
          Add new trip
        </Button>
      </Stack>

      <Stack sx={{ backgroundColor: "white", padding: "0px 20px" }}>
        <DataTable
        // pagination
          customStyles={{
            headCells: {
              style: {
                fontWeight: "bold",
                fontSize: "14px",
              },
            },
            rows: {
              style: {},
            },
          }}
          columns={columns}
          fixedHeader
          data={trips
            ?.filter((trip) => trip?.vehicle === location.state?.vehicle.id)
            ?.sort((a, b) => a.id - b.id)}
        />
      </Stack>

      <Modal isOpen={isModalOpen}>
        <ElementsModal
          isSaving={isSaving}
          onClose={() => {
            setIsModalOpen(false);
            setElementToEdit(undefined);
          }}
          currentElem={elementToEdit}
          onAddElement={handleAddNewTrip}
        >
          <TripModalContent setTrips={setTrips}></TripModalContent>
        </ElementsModal>
      </Modal>
    </Stack>
  );
};

export default Trips;
