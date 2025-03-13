import React from "react";
import DataTable from "react-data-table-component";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Vehicles = (props) => {
  const vehicles = props.vehicles;
  const navigate = useNavigate();

  const viewVehicle = (vehicle) => {
    console.log("veh", vehicle);
    navigate(`/trips/${vehicle.id}`, { state: { vehicle } });
  };

  const columns = [
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
          <AddIcon
            onClick={() => viewVehicle(cell)}
            style={{ cursor: "pointer" }}
          >
            {" "}
          </AddIcon>
        );
      },
      sortable: true,
    },
  ];

  const handleAddNewVehicle = () => {
    console.log("add new vehicle");
  };
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

      <DataTable
        columns={columns}
        fixedHeader
        data={vehicles}
      />
    </Stack>
  );
};

export default Vehicles;
