import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { deleteVehicle, getVehicles } from "../../services/fetch";

const Vehicles = ({ vehicles, setVehicles }) => {
  const navigate = useNavigate();

  const viewVehicle = (vehicle) => {
    navigate(`/trips/${vehicle.id}`, { state: { vehicle } });
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const success = await deleteVehicle(vehicleId);
      if (success) {
        const resp = await getVehicles();
        setVehicles(resp.results);
      }
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  const handleAddNewVehicle = () => {
    console.log("add new vehicle");
  };

  const handleEditVehicle = (vehicle) => {
    console.log("edited veh", vehicle);
    // navigate(`/trips/${vehicle.id}`, { state: { vehicle } });
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Id</span>,
      selector: (row) => row.id,
      sortable: true,
    },
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
      name: <span className="font-weight-bold fs-13"></span>,
      cell: (cell) => {
        return (
          <EditIcon
            onClick={() => handleEditVehicle(cell)}
            style={{ cursor: "pointer" }}
          >
            {" "}
          </EditIcon>
        );
      },
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13"></span>,
      cell: (cell) => {
        return (
          <DeleteIcon
            onClick={() => handleDeleteVehicle(cell.id)}
            style={{ cursor: "pointer" }}
          >
            {" "}
          </DeleteIcon>
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

      {vehicles && <DataTable columns={columns} fixedHeader data={vehicles} />}
    </Stack>
  );
};

export default Vehicles;
