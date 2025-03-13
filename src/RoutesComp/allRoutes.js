import Trips from "../pages/Trips";
import Dashboard from "../pages/Dashboard";

const authProtectedRoutes = [
];

const publicRoutes = [
  { path: "/", component: Dashboard },
  { path: "/trips/:vehicleId", component: Trips },
];

export { authProtectedRoutes, publicRoutes };
