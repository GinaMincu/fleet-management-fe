import React, { useEffect, useState } from "react";
import API_URL from "../../config";
import Vehicles from "../Vehicles";
import { getVehicles } from "../../services/fetch";

const Dashboard = (props) => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const resp = await getVehicles();
      //if pagination in DRF-django rest framework is deactivated-> resp is the array of results, otherwise 
      //you get {"count": 7,"next": null,"previous": null,"results": [ {},{},{}..]}
      setVehicles(resp);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div style={{ padding: "10px 20px" }}>
      <Vehicles vehicles={vehicles} setVehicles={setVehicles}></Vehicles>
    </div>
  );
};

export default Dashboard;
