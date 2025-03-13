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
