import React from "react";
import Box from "@mui/material/Box";
import { Typography, LinearProgress } from "@mui/material";

type LoaderProps = {
  text?: string
};

const Loader = ({ text = "Loading..." }: LoaderProps): JSX.Element => {
  return (
    <Box sx={{ width: 400, margin: "auto 0" }} mt={50}>
      <LinearProgress color="primary" />

      <Typography variant="body2" textAlign="center" mt={2}>
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
