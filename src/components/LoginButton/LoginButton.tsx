import React from "react";
import { MenuItem, Typography, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { useAuthContext } from "./../../contexts/auth.context";
import { getTokens } from "./../../services/api";
import { client_id, redirect_uri } from "./../../constants/enviroments";

interface TokensProps {
  accessToken: string;
  refreshToken: string;
}

const LoginButton = () => {
  // @ts-ignore
  const { login, logout, isAuthenticated } = useAuthContext();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  if (code) {
    getTokens(code).then((res: TokensProps) => {
      if (res) {
        login(res.accessToken, res.refreshToken);
      }
    });
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated && (
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      )}

      {!isAuthenticated && (
        <Button sx={{ my: 2, color: "white", display: "block" }}>
          <a
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>Login with GitHub</span>
          </a>
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
