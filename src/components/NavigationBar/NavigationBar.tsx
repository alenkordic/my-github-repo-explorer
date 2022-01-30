import React from "react";

import {auth} from "./../../services/api"

import { LoginButton } from "./../../components";

import useStyles from "./NavigationBar.styles";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

const NavigationBar = () => {
  const classes = useStyles();

  const handleLoginClick = ()=> {
    auth()
  }

  return (
    <Box sx={{ flexGrow: 1 }} mb={5}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            HOME
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
          <LoginButton />
          {/* <Button color="inherit" onClick={handleLoginClick}>Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
