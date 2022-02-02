import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { ACTION_TYPES } from "./../../constants/actionTypes";
import {
  client_id,
  redirect_uri,
  proxy_url,
} from "./../../constants/enviroments";
import { useRepoExplorerContext } from "./../../store";

import { MenuItem, Typography, Button } from "@mui/material";

const LoginButton = () => {
  const { state, dispatch } = useRepoExplorerContext();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

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
          // access_token res
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          dispatch({
            type: ACTION_TYPES.LOGIN,
          });
        })
        .catch((error) => {
          console.log("errrrorrr", error);
        });
    }
  }, [dispatch, code]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch({
      type: ACTION_TYPES.LOGOUT,
    });
  };

  return (
    <div>
      {state.isLoggedIn && (
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      )}

      {!state.isLoggedIn && (
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

// useEffect(() => {
//   // After requesting Github access, Github redirects back to your app with a code parameter
//   const url = window.location.href;
//   const hasCode = url.includes("?code=");

//   // If Github API returns the code parameter
//   if (hasCode) {
//     const newUrl = url.split("?code=");
//     //@ts-ignore
//     window.history.pushState({}, null, newUrl[0]);
//     setData({ ...data, isLoading: true });

//     const requestData = {
//       code: newUrl[1],
//     };

//     const proxy_url = state.proxy_url;

//     // Use code parameter and other parameters to make POST request to proxy_server

//     fetch(proxy_url, {
//       method: "POST",
//       body: JSON.stringify(requestData),
//     })
//       .then((response) => {
//           // console.log("responseeeeeeee",response)
//           return response.json()})
//       .then((data) => {
//         console.log("dataaaaaaaaaaaaa",data)
//         dispatch({
//           type: ACTION_TYPES.LOGIN,
//           payload: { user: data, isLoggedIn: true },
//         });
//       })
//       .catch((error) => {
//         setData({
//           isLoading: false,
//           errorMessage: "Sorry! Login failed",
//         });
//       });
//   }
// }, [state, dispatch, data]);

// WORKS
// useEffect(() => {
//   // After requesting Github access, Github redirects back to your app with a code parameter
//   const url = window.location.href;
//   const hasCode = url.includes("?code=");

//   // If Github API returns the code parameter
//   if (hasCode) {
//     const newUrl = url.split("?code=");
//     //@ts-ignore
//     window.history.pushState({}, null, newUrl[0]);
//     setData({ ...data, isLoading: true });

//     const requestData = {
//       code: newUrl[1],
//     };

//     const proxy_url = state.proxy_url;

//     // Use code parameter and other parameters to make POST request to proxy_server
//     fetch(proxy_url, {
//       method: "POST",
//       body: JSON.stringify(requestData),
//     })
//       .then((response) => {
//         return response.json()
//       })
//       .then((res) => {
//         // access_token res
//         localStorage.setItem('access_token', res)
//         return res;
//       })
//       .catch((error) => {
//         console.log("errrrorrr",error)
//         // setData({
//         //   isLoading: false,
//         //   errorMessage: "Sorry! Login failed",
//         // });
//       });

//   }

// }, [state, dispatch, data]);
