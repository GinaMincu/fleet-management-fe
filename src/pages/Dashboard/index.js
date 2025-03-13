import React, { useEffect, useState } from "react";
import API_URL from "../../config";
import Vehicles from "../Vehicles";

const Dashboard = (props) => {
  const [vehicles, setVehicles] = useState([]);

  const getVehicles = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setVehicles(data.results);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div style={{ padding: "10px 20px" }}>
      <Vehicles vehicles={vehicles}></Vehicles>
    </div>
  );
};

export default Dashboard;
