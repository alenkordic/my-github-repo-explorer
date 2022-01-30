import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

//@ts-nocheck

import { useRepoExplorerContext } from "./../../store";
import { ACTION_TYPES } from "./../../constants/actionTypes";

const LoginButton = () => {
  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const { state, dispatch } = useRepoExplorerContext();

  console.log("state", state);

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      //@ts-ignore
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1],
      };

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server

      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: ACTION_TYPES.LOGIN,
            payload: { user: data, isLoggedIn: true },
          });
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed",
          });
        });
    }
  }, [state, dispatch, data]);

  const handleLogout = () => {
    dispatch({
      type: ACTION_TYPES.LOGOUT,
      payload: { isLoggedIn: false, user: null },
    });
  };

  if (state.isLoggedIn) {
    alert("LOGEN IN");
  }

  return (
    <div>
      {state.isLoggedIn && (
        <a
          onClick={() => handleLogout()}
        >
          <span>Logout with GitHub</span>
        </a>
      )}

      {!state.isLoggedIn && (
        <a
          href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
          onClick={() => {
            setData({ ...data, errorMessage: "" });
          }}
        >
          <span>Login with GitHub</span>
        </a>
      )}
    </div>
  );
};

export default LoginButton;
