import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  Container
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { LoginButton, SwitchMode } from "../../components";

interface User {
  avatar_url: string;
  login: string;
}
interface NavigationBArViewProps {
  isAuthenticated: boolean;
  user: User;
}

const NavigationBarView = ({
  isAuthenticated,
  user
}: NavigationBArViewProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      data-cy="navbar"
      sx={{ minHeight: 70, justifyContent: "center", marginBottom: 10 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <SwitchMode />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "flex" } }}
          >
            <GitHubIcon fontSize="large" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            {!isAuthenticated && <LoginButton />}
          </Box>

          <Box mr={2} data-cy="userNameText">
            <Typography>{isAuthenticated ? user?.login : "Guest"}</Typography>{" "}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && (
              <>
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.login} src={user?.avatar_url} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <LoginButton />
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBarView;
