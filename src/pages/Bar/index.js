import React from "react";
import { Box, Typography } from "@mui/material";

const Bar = (props) => {
  return (
    <Box
      position="sticky"
      style={{
        top: 0,
        backgroundColor: "#062c43",
        color: "white",
        padding: "10px 20px",
      }}
    >
      <Typography variant="h4">Fleet Management Logo</Typography>
    </Box>
  );
};

export default Bar;
