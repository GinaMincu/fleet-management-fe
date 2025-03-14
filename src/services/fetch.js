import API_URL from "../config";

export const getVehicles = async () => {
  try {
    const response = await fetch(`${API_URL}/api/vehicles/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


export const addVehicle = async (newVehicle) => {

  try {
    const response = await fetch(`${API_URL}/api/vehicles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Required for JSON payload
      },
      body: JSON.stringify(newVehicle) // Convert object to JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const updateVehicle = async (vehicleId,updatedVehicle) => {
  try {
    const response = await fetch(`${API_URL}/api/vehicles/${vehicleId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",  // Required for JSON payload
      },
      body: JSON.stringify(updatedVehicle) // Convert object to JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const response = await fetch(`${API_URL}/api/vehicles/${vehicleId}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
