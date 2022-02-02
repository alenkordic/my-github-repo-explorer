import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "./../../contexts/auth.context";


import {
  client_id,
  redirect_uri,
  proxy_url,
} from "./../../constants/enviroments";


import { MenuItem, Typography, Button } from "@mui/material";

const LoginButton = () => {
  
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  // @ts-ignore
  const { login, logout, isAuthenticated } = useAuthContext();

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    if (code) {
      const requestData = { code };
      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          login(res.access_token, res.refresh_token);
        })
        .catch((error) => {
          console.log("errrrorrr", error);
          logout();
        });
    }
  }, []);

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