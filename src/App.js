import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesComp from "./RoutesComp"; // Ensure this matches your file name

import Bar from "./pages/Bar";

function App() {
  return (
    <BrowserRouter>
      <Bar></Bar>
      <RoutesComp />
    </BrowserRouter>
  );
}

export default App;
