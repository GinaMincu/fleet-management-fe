import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { deleteVehicle, getVehicles } from "../../services/fetch";
import Modal from "../../components/Modal";
import ElementsModal from "../../components/Modal/ElementsModal";
import VehicleModalContent from "./VehicleModalContent";

const Vehicles = ({ vehicles, setVehicles }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elementToEdit, setElementToEdit] = useState();
  const [isSaving, setIsSaving] = useState(false);

  const viewVehicle = (vehicle) => {
    navigate(`/trips/${vehicle.id}`, { state: { vehicle } });
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const success = await deleteVehicle(vehicleId);
      if (success) {
        const resp = await getVehicles();
        setVehicles(resp);
      }
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsSaving(false);
  };

  const handleAddNewVehicle = (newVehicle) => {
    setElementToEdit(newVehicle);

    setIsSaving(true);
    setTimeout(toggleModal, 500);
  };

  const handleEditVehicle = (updatedVehicle) => {
    setElementToEdit(updatedVehicle);

    setIsSaving(true);
    setTimeout(toggleModal, 500);
  };

  const columns = [
    // {
    //   name: <span className="font-weight-bold fs-13">Id</span>,
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: <span className="font-weight-bold fs-13">Plate number</span>,
      selector: (row) => row.plate,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Model</span>,
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Color</span>,
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Trips</span>,
      cell: (cell) => {
        return (
          <DriveEtaIcon
            onClick={() => viewVehicle(cell)}
            style={{ cursor: "pointer" }}
          >
            {" "}
          </DriveEtaIcon>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Actions</span>,
      cell: (cell) => {
        return (
          <>
          <EditIcon
            onClick={() => handleEditVehicle(cell)}
            style={{ cursor: "pointer" }}
          >
            {" "}
          </EditIcon>
          
          <DeleteIcon
          onClick={() => handleDeleteVehicle(cell.id)}
          style={{ cursor: "pointer",marginLeft:"20px" }}
        >
          {" "}
        </DeleteIcon>
        </>
        );
      },
      sortable: true,
    },

  ];

  return (
    <Stack sx={{ backgroundColor: "white" }}>
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 15px",
        }}
        direction="row"
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#062c43",
          }}
        >
          Vehicles
        </Typography>
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
          onClick={() => handleAddNewVehicle()}
        >
          Add new vehicle
        </Button>
      </Stack>

      {vehicles && (
        <DataTable
        // pagination
          columns={columns}
          fixedHeader
          data={vehicles?.sort((a, b) => a.id - b.id)}
        />
      )}

      <Modal isOpen={isModalOpen}>
        <ElementsModal
          isSaving={isSaving}
          onClose={() => {
            setIsModalOpen(false);
            setElementToEdit(undefined);
          }}
          onAddElement={handleAddNewVehicle}
          onEditElement={handleEditVehicle}
          
        >
        <VehicleModalContent setVehicles={setVehicles} elementToEdit={elementToEdit}></VehicleModalContent>
        </ElementsModal>
      </Modal>
    </Stack>
  );
};

export default Vehicles;
