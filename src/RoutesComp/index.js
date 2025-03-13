import React from "react";
import { Routes, Route } from "react-router-dom";

import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from "./AuthProtected";

const RoutesComp = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<route.component />}
          />
        ))}

        <Route element={<AuthProtected />}>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={<AccessRoute group={route.group} component={route.component} />}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default RoutesComp;
