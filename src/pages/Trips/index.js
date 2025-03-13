import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const Trips = (props) => {
  const location = useLocation();
  const [trips, setTrips] = useState(location.state?.vehicle.trips || null);
  const navigate = useNavigate();

  const columns = [
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

  const handleAddNewTrip = () => {
    console.log("add trip");
  };

  const handleBackToPrevPage = () => {
    navigate(-1);
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
          data={trips}
        />
      </Stack>
    </Stack>
  );
};

export default Trips;
